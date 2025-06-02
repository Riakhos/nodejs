import { sendResponse } from "./send_response.js";
import { validateObjectId } from "./validateObjectId.js";

/**
 * Fonction générique pour créer un document dans une collection MongoDB et mettre à jour des relations associées.
 *
 * @param {Object} Model - Le modèle Mongoose correspondant à la collection de base de données.
 * @param {Object} req - Objet de requête HTTP contenant les données à insérer dans req.body et les informations utilisateur dans req.user.
 * @param {Object} res - Objet de réponse HTTP utilisé pour envoyer une réponse au client.
 * @param {Array} relatedUpdates - Tableau d'objets décrivant les relations à mettre à jour après la création du document.
 *    - Chaque objet doit contenir les propriétés :
 *      - `model`: Le modèle Mongoose pour la relation.
 *      - `id`: L'ID du document lié à mettre à jour.
 *      - `action`: L'action MongoDB (ex. : `$push`, `$pull`) à appliquer pour la mise à jour.
 */
export const createDocument = async (Model, req, res, relatedUpdates = []) => {
    try {
        // Création d'un nouveau document avec les données du corps de la requête (req.body) et en ajoutant l'ID de l'utilisateur connecté (req.user.id) comme référence.
        const newDocument = await Model.create({ ...req.body, user: req.user ? req.user.id : null });

        // Si des relations associées doivent être mises à jour, on les traite ici.
        for (const update of relatedUpdates) {
            const { model, id, action } = update;

            // Mise à jour du document lié (ex. : ajout de l'ID du nouveau document dans un tableau)
            await model.findByIdAndUpdate(id, action, { new: true, upsert: true });
        }

        // Envoi d'une réponse au client avec un statut 201 (créé) et les détails du nouveau document.
        sendResponse(
            res,
            201,
            `${Model.modelName} has been created successfully!`,
            newDocument
        );
    } catch (error) {
        // Gestion des erreurs : affichage dans la console et envoi d'une réponse 500 (erreur interne du serveur).
        console.error(`Error while creating ${Model.modelName}:`, error);
        sendResponse(res, 500, `Error while creating ${Model.modelName}!`);
    }
};

/**
 * Fonction générique pour récupérer une liste de documents depuis une collection MongoDB avec options de pagination et de peuplement.
 *
 * @param {Object} Model - Le modèle Mongoose correspondant à la collection de base de données.
 * @param {Object} req - Objet de requête HTTP contenant les paramètres pour la pagination et autres options.
 * @param {Object} res - Objet de réponse HTTP utilisé pour envoyer une réponse au client.
 * @param {Array} populateFields - Tableau de champs à peupler pour inclure les relations dans les documents retournés.
 */
export const getDocuments = async (Model, req, res, populateFields = []) => {
    try {
        // Récupération des paramètres de pagination depuis la requête, avec des valeurs par défaut
        const { page = 1, limit = 10 } = req.query;

        // Initialisation de la requête de base sur le modèle
        let query = Model.find();

        // Ajout des champs à peupler si spécifiés
        if (populateFields.length > 0) {
            populateFields.forEach((field) => {
                query = query.populate(field); //* Ajoute un champ à peupler à la requête
            });
        }

        // Application de la pagination
        // - `skip`: Ignore les documents des pages précédentes
        // - `limit`: Limite le nombre de documents retournés
        const documents = await query
            .skip((page - 1) * limit) //* Saute les documents précédents
            .limit(limit); //* Limite les documents à la taille de la page

        // Envoi des documents récupérés dans la réponse avec un message de succès
        sendResponse(
            res,
            200,
            `${Model.modelName}s retrieved successfully!`,
            documents
        );
    } catch (error) {
        console.error(`Error when retrieving ${Model.modelName}s:`, error);
        sendResponse(res, 500, `Error when retrieving ${Model.modelName}s!`);
    }
};

/**
 * Fonction générique pour récupérer un document par son ID.
 *
 * @param {Object} Model - Le modèle Mongoose correspondant à la collection de base de données.
 * @param {Object} req - Requête HTTP contenant l'ID dans les paramètres (req.params.id).
 * @param {Object} res - Réponse HTTP utilisée pour envoyer les données ou un message d'erreur.
 * @param {Boolean} deleteOperation - Indique si l'opération en cours est une suppression :
 *                                      - true : Supprime le document après récupération.
 *                                      - false : Renvoie le document trouvé.
 * @param {Function|null} callback - Fonction de rappel optionnelle à exécuter avec le document récupéré.
 *                                   Utile pour des traitements spécifiques avant la réponse.
 * @param {Array} populateFields - Tableau des champs à peupler (relations avec d'autres collections).
 */
export const getDocumentById = async (
    Model,
    req,
    res,
    deleteOperation = false,
    callback = null,
    populateFields = []
) => {
    try {
        // Liste des noms de paramètres possibles
        const id = req.params.id || req.params.avisId || req.params.articleId;

        // Validation de l'ID
        if (!id || !validateObjectId(id, res)) {
            return; //* Stoppe l'exécution si l'ID est manquant ou invalide
        }

        // Construction de la requête avec ou sans population
        let query = Model.findById(id); //* Initialisation de la requête pour trouver un document spécifique par son ID

        // Vérification si des champs doivent être peuplés
        if (populateFields.length > 0) {
            // Parcourt chaque champ spécifié dans le tableau `populateFields`
            populateFields.forEach((field) => {
                // Ajoute la population du champ à la requête
                query = query.populate(field);
            });
        }

        // Exécution de la requête pour récupérer le document
        const document = await query.exec();

        // Si le document n'existe pas, retourne une réponse 404.
        if (!document)
            return sendResponse(res, 404, `${Model.modelName} not found!`);

        // Exécution du callback personnalisé si fourni
        if (callback && typeof callback === 'function') {
            return callback(document);
        }

        // Si l'opération est une suppression, supprime le document et envoie une confirmation.
        if (deleteOperation) {
            // Si l'opération est une suppression
            await Model.findByIdAndDelete(id);
            sendResponse(
                res,
                200,
                `${Model.modelName} with ID ${id} has been deleted.`
            );
        } else {
            // Sinon, retourne le document trouvé.
            sendResponse(res, 200, `${Model.modelName} found!`, document);
        }
    } catch (error) {
        console.log(`Error when retrieving of ${Model.modelName}!`, error);
        sendResponse(res, 500, `Error when retrieving of ${Model.modelName}!`);
    }
};

/**
 * Fonction générique pour trier des documents par un champ spécifique.
 *
 * @param {Object} Model - Le modèle Mongoose correspondant à la collection de base de données.
 * @param {String} field - Nom du champ utilisé pour le tri.
 * @param {Number} order - Ordre de tri : 1 pour croissant, -1 pour décroissant.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP utilisée pour envoyer les données ou un message d'erreur.
 * @param {Function} next - Fonction middleware pour gérer les erreurs.
 */
export const sortDocumentsByField = async (
    Model,
    field,
    order,
    req,
    res,
    next
) => {
    try {
        // Recherche et tri des documents dans la collection.
        const documents = await Model.find() //* Récupère tous les documents.
            .sort({ [field]: order }) //* Tri par le champ spécifié (croissant ou décroissant).
            .populate({
                path: "avis", //* Champ lié "avis" à peupler.
                populate: {
                    path: "user", //* Sous-champ lié "user" à peupler à partir de "avis".
                    select: "prenom avatar", //* Sélection des champs spécifiques "prenom" et "avatar" pour les utilisateurs.
                },
            });

        // Envoie la liste triée dans la réponse.
        sendResponse(
            res,
            200,
            `List of all ${Model.modelName} sorted by ${field} in ${order === 1 ? "ascending" : "descending"
            } order.`,
            documents
        );
    } catch (error) {
        console.log(
            `Error when sorting the documents of ${Model.modelName}!`,
            error
        );
        sendResponse(
            res,
            500,
            `Error when sorting the documents of ${Model.modelName}!`
        );
    }
};
