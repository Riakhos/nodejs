import Avis from "../models/avis.model.js";
import Article from "../models/article.model.js";
import { sendResponse } from "../utils/send_response.js";
import {
  createDocument,
  getDocuments,
  getDocumentById,
} from "../utils/common.controller.js";

// Fonction pour créer un avis
export const postAvis = async (req, res) => {
  // Validation des champs nécessaires
  if (!req.body.article || !req.body.rating || !req.body.comment) {
    return sendResponse(res, 400, "All fields are required!");
  }

  // Vérification de la note (rating) entre 1 et 5
  if (req.body.rating < 1 || req.body.rating > 5) {
    return sendResponse(res, 400, "Rating must be between 1 and 5!");
  }

  // Création de l'avis
  const avis = await Avis.create({ ...req.body, user: req.user.id });

  await createDocument(Avis, req, res, [
    {
      model: Article,
      id: req.body.article,
      action: { $push: { avis: req.body.avisId } },
    },
  ]);
};

// Fonction pour récupérer tous les avis
export const getAvis = async (req, res) => {
  await getDocuments(Avis, req, res, [
    {
      path: "user",
      select: "name email",
    },
    {
      path: "article",
      select: "name",
    },
  ]);
};

// Fonction pour afficher un avis par son id
export const getAvisById = async (req, res) => {
  getDocumentById(Avis, req, res, false, ["user", "article"]);
};

// Fonction pour supprimer un avis par son id
export const deleteAvis = async (req, res) => {
  // Utilisation de la fonction générique `getDocumentById` pour récupérer un avis par son ID
  await getDocumentById(Avis, req, res, false, async (avis) => {
    // Vérifier si l'utilisateur est le créateur de l'avis ou un administrateur
    if (!checkPermission(avis, req.user.id, req.user.role, ["admin"])) {
      // Si l'utilisateur n'a pas les permissions nécessaires
      return sendResponse(
        res,
        403,
        "You are not allowed to delete this notice!"
      );
    };

    // Suppression de l'avis
    await avis.deleteOne();

    // Mise à jour de l'article associé pour retirer l'avis supprimé
    await Article.findByIdAndUpdate(avis.article, {
      $pull: { avis: req.params.avisId },
    });

    // Envoi d'une réponse indiquant que l'avis a été supprimé avec succès
    sendResponse(res, 200, "Notice deleted successfully.");
  });
};

// Fonction pour modifier un avis par son id
export const updateAvis = async (req, res) => {
  // Utilisation de getDocumentById avec un callback pour la mise à jour de l'avis
  await getDocumentById(Avis, req, res, false, async (avis) => {
    // Vérifier si l'utilisateur est le créateur de l'avis ou un administrateur
    if (!checkPermission(avis, req.user.id, req.user.role)) {
      // Si l'utilisateur n'a pas les permissions nécessaires
      return sendResponse(
        res,
        403,
        "You are not allowed to update this notice!"
      );
    };

    // Mise à jour de l'avis avec les données fournies dans le corps de la requête
    const updatedAvis = await Avis.findByIdAndUpdate(
      req.params.avisId, //* ID de l'avis à mettre à jour
      { ...req.body }, //* Données envoyées dans le corps de la requête
      {
        new: true, //* Retourne l'avis mis à jour
        runValidators: true, //* Applique les validateurs de schéma
        upsert: false, //* Ne crée pas un nouveau document si l'ID n'existe pas
      }
    );

    sendResponse(res, 200, "Notice updated successfully.", updatedAvis);
  });
};
