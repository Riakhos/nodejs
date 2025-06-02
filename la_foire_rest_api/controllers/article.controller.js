import Article from "../models/article.model.js";
import { sendResponse } from "../utils/send_response.js";
import {
  createDocument,
  getDocuments,
  getDocumentById,
} from "../utils/common.controller.js";

// Fonction pour créer un nouvel article
export const postArticle = async (req, res) => {
  createDocument(Article, req, res);
};

// Fonction pour récupérer tous les articles
export const getAllArticle = async (req, res) => {
  getDocuments(Article, req, res, ["avis"]);
};

// Fonction pour récupérer un article par ID
export const oneArticle = async (req, res) => {
  getDocumentById(Article, req, res, false, null, ["avis"]);
};

// Fonction pour mettre à jour un article
export const updateArticle = async (req, res) => {
  // Utilisation de `getDocumentById` pour récupérer l'article
  await getDocumentById(Article, req, res, false, async (article) => {
    // Vérification de l'autorisation de l'utilisateur
    const currentUserId = req.user.id;
    const currentUserRole = req.user.role;
    const isUserAuthorized =
      currentUserRole === "admin" ||
      article.avis.some((avis) => avis.user._id.toString() === currentUserId);

    // Vérifier si l'utilisateur est le créateur de l'avis ou un administrateur
    if (!isUserAuthorized) {
      return sendResponse(
        res,
        403,
        "You are not allowed to update this article!"
      );
    }

    // Mise à jour de l'article
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true } // Retourne l'article mis à jour
    );

    // Envoi de la réponse avec l'article mis à jour
    sendResponse(res, 200, "Article updated successfully.", updatedArticle);
  });
};

// Fonction pour supprimer un article par son id
export const deleteArticle = async (req, res) => {

  // Utilisation de `getDocumentById` pour récupérer l'article par son ID
  await getDocumentById(Article, req, res, true, async (article) => {

    // Vérification de l'autorisation de l'utilisateur
    const { id: currentUserId, role: currentUserRole } = req.user || {}

    if (!currentUserId || !currentUserRole) {
      return sendResponse(res, 401, "User authentication required.")
    }

    // Vérification des autorisations
    const isUserAuthorized =
      currentUserRole === "admin" ||
      article.avis.some((avis) => avis.user._id.toString() === currentUserId)

    // Vérifier si l'utilisateur est le créateur de l'article ou un administrateur
    if (!isUserAuthorized)
      return sendResponse(res, 403, "You are not allowed to update this article!");

    // On supprime l'article
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return sendResponse(res, 404, "Article not found!");
    }

    sendResponse(res, 200, "Article deleted ! ", deletedArticle);
  });
};

// Route GET pour récupérer tous les articles triés par prix croissant
export const ascArticle = async (req, res) => {
  sortDocumentsByField(Article, "price", 1, req, res); //* 1 pour croissant
};

// Route GET pour récupérer tous les articles triés par prix décroissant
export const descArticle = async (req, res) => {
  sortDocumentsByField(Article, "price", -1, req, res); //* -1 pour décroissant
};

// Fonction pour récupérer tous les avis d'un article par son Id
export const avisByArticle = async (req, res) => {
  // Utilisation de la fonction générique `getDocumentById` pour récupérer l'article et ses avis
  await getDocumentById(Article, req, res, false, async (article) => {
    // Vérification des avis de l'article
    if (!article || !article.avis || article.avis.length === 0) {
      return sendResponse(res, 404, "No reviews found for this article.");
    }

    // Retourne les avis de l'article avec un statut 200
    sendResponse(
      res,
      200,
      "List of all reviews for the article:",
      article.avis
    );
  });
};

// Fonction pour afficher les articles par note
export const sortedByNote = async (req, res) => {
  try {
    // Récupérer les avis et calculer la note moyenne pour chaque article
    const articles = await Article.aggregate([
      {
        // "Opérateur d'agrégation utilisé pour effectuer une jointure avec une autre collection."
        $lookup: {
          // Effectue une jointure avec la collection 'avis'
          from: "avis", //* Collection avec laquelle nous voulons faire la jointure
          localField: "_id", //* Champ de la collection 'Article' utilisé pour la jointure
          foreignField: "article", //* Champ de la collection 'avis' utilisé pour la jointure
          as: "avis", //* Nom du nouveau champ qui contiendra les documents joints
        },
      },
      {
        $addFields: {
          // Ajoute de nouveaux champs aux documents
          averageRating: { $avg: "$avis.rating" }, //* Calcule la note moyenne des avis pour chaque article
        },
      },
      {
        $sort: { averageRating: -1 }, //* Trie les articles en fonction de leur note moyenne en ordre décroissant
      },
    ]);

    // Vérifier si des articles ont été trouvés
    if (!articles || articles.length === 0)
      return sendResponse(res, 404, "Article not found!", articles);

    // Envoyer une réponse avec le statut 200 (succès) et les articles triés
    sendResponse(
      res,
      200,
      "List all articles in descending order by rating :",
      articles
    );
  } catch (error) {
    console.log(
      "Error when retrieving of list all articles in descending order by rating :",
      error
    );
    sendResponse(
      res,
      500,
      "Error when retrieving of list all articles in descending order by rating!"
    );
  }
};

// Endpoint pour rechercher des articles
export const search = async (req, res) => {
  try {
    const { name, category, price, brand } = req.query

    // Construire un objet de filtre dynamique
    const filter = {}
    if (name) filter.name = { $regex: name, $options: "i" } // Recherche insensible à la casse
    if (category) filter.category = { $regex: category, $options: "i" }
    if (brand) filter.brand = { $regex: brand, $options: "i" }
    if (price) filter.price = { $lte: Number(price) } // Articles dont le prix est inférieur ou égal

    const articles = await Article.find(filter)
    sendResponse(res, 200, "Here's the list of items we found!", articles)
  } catch (error) {
    sendResponse(res, 500, "Erreur lors de la recherche", error)
  }
}

