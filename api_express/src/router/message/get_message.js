import express from "express"
import Message from "../../models/message.model.js"
import sendResponse from "../../utils/sendResponse.js"
import { validateMessageId } from "../../middlewares/validators/message.validator.js"
import { validationResult } from "express-validator"

const router = express.Router()

// Route GET /all : Récupérer tous les messages avec pagination
router.get("/all", async (req, res) => {

    //* Pagination avec les paramètres `page` et `limit`
    const { page = 1, limit = 10 } = req.query

    try {

        //* Validation des paramètres
        const pageNum = Math.max(1, parseInt(page)) //* Assure une valeur positive
        const limitNum = Math.max(1, parseInt(limit)) //* Assure une valeur positive

        //* Récupérer tous les messages depuis MongoDB
        const messages = await Message.find()

            //* Ignorer les résultats des pages précédentes
            .skip((pageNum - 1) * limit)

            //* Limiter le nombre de résultats
            .limit(limitNum)

            //* Récupère uniquement "nom" et "prenom" de l'utilisateur
            .populate("user", "firstname lastname")

        sendResponse(res, 200, "Liste des messages récupérées.", messages)
    } catch (error) {
        sendResponse(res, 500, "Erreur serveur.", error.message)
    }
});

// Route GET /find/:idMessage : Trouver un message par ID avec validation
router.get("/find/:idMessage", validateMessageId, async (req, res) => {

    //* Récupère les erreurs de validation dans la requête
    const errors = validationResult(req)

    //* Si des erreurs existent, retourne une réponse 400 avec les détails
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, "Entrées invalides.", errors.array())
    }

    const { idMessage } = req.params

    try {
        //* Rechercher le message par idMessage MongoDB
        const message = await Message.findById(idMessage).populate(
        "user",
        "firstname lastname"
        )

        //* On s'assure que le message existe
        if (!message) {
        return sendResponse(res, 404, "Message non trouvé.")
        }

        //* On affiche le message
        sendResponse(res, 200, "Message trouvé.", message)
    } catch (error) {
        sendResponse(res, 500, "Erreur serveur.", error.message)
    }
})

// Route GET /all/message/:idUser : Trouver tous les messages d'un utilisateur par ID
router.get("/all/message/:idUser", async (req, res) => {
    const { idUser } = req.params;
    try {
        const messages = await Message.find({ user: idUser }).populate(
            "user",
            "firstname lastname"
        );
        if (messages.length === 0) {
            return sendResponse(res, 404, "Aucun message trouvé pour cet utilisateur.");
        }
        sendResponse(res, 200, "Messages trouvés.", messages);
    } catch (error) {
        sendResponse(res, 500, "Erreur serveur.", error.message);
    }
});
export default router