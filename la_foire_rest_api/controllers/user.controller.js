import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { env } from "../config/index.js";
import { sendResponse } from "../utils/send_response.js";
import {
  createDocument,
  getDocuments,
  getDocumentById,
} from "../utils/common.controller.js";

// Fonction pour inscrire un utilisateur
export const signup = async (req, res) => {
  // Validation des champs requis
  const { prenom, avatar, email, password } = req.body;
  if (!prenom || !avatar || !email || !password) {
    return sendResponse(res, 400, "All fields are required!");
  }

  // Vérification de l'unicité de l'email est gérée par Mongoose via le plugin mongoose-unique-validator
  await createDocument(User, req, res);
};

// Fonction pour se connecter
export const sign = async (req, res) => {
  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email: req.body.email });

    if (!user) return sendResponse(res, 404, "User not Found !");

    // Comparaison des mots de passe en utilisant la méthode définie dans le modèle
    const comparePassword = await user.comparePassword(req.body.password);

    if (!comparePassword) return sendResponse(res, 400, "Wrong Credentials !");

    // Création du jeton JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      env.TOKEN,
      { expiresIn: "24h" }
    );

    // Exclusion du mot de passe dans la réponse
    const { password, ...others } = user._doc;
    const userWithoutPassword = others; //* Alias pour plus de clarté

    // Envoi de la réponse avec le cookie JWT
    //? Approche avec sendResponse et inclusion des cookies
    sendResponse(res, 200, "Authentication successful!", {
      token,
      user: userWithoutPassword
    }, {
      cookie: {
        name: "access_token", //* Nom du cookie
        value: token, //* Valeur du cookie (le JWT)
        settings: {
          //* Options du cookie :
          httpOnly: true, //? Cookie inaccessible via JavaScript
          // secure: false,                 //? Envoyé uniquement en HTTPS
          // path: "/",           //? Valable uniquement pour /dashboard
          // maxAge: 2 * 3600 * 1000,      //? 2 heures
          sameSite: "strict",           //? Restreint aux requêtes du même domaine
        },
      },
    })
  } catch (error) {
    console.log("Error while connecting user :", error);
    sendResponse(res, 500, "Error while connecting user!");
  }
};

// Fonction pour récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  await getDocuments(User, req, res, []);
};

// Fonction pour récupérer un utilisateur par son ID
export const getUserById = async (req, res) => {
  getDocumentById(User, req, res, false, null, []);
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (req, res) => {
  await getDocumentById(User, req, res, false, async (user) => {
    // Vérifie si l'utilisateur connecté est l'utilisateur cible ou un administrateur
    if (req.user.id !== user.id && req.user.role !== "admin") {
      return sendResponse(res, 403, "You are not allowed to delete this user!");
    }

    // Désactiver le compte (isActive = false)
    user.isActive = false;
    await user.save();
    sendResponse(
      res,
      200,
      `The User with the id ${req.params.id} has been deleted.`
    );
  });
};

// Fonction pour réactiver un utilisateur
export const reactivateUser = async (req, res) => {
  await getDocumentById(User, req, res, false, async (user) => {
    try {
      // Vérification si l'utilisateur est déjà actif
      if (user.isActive) {
        return sendResponse(res, 400, "This user is already active!");
      }

      // Réactiver le compte utilisateur
      user.isActive = true;
      await user.save();

      sendResponse(
        res,
        200,
        `User with ID ${req.params.id} has been reactivated.`
      );
    } catch (error) {
      console.error("Error during user reactivation:", error);
      sendResponse(res, 500, "Error during user reactivation!");
    }
  });
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  await getDocumentById(User, req, res, false, async (user) => {
    // Vérifie si l'utilisateur connecté est l'utilisateur cible ou un administrateur
    if (req.user.id !== user.id && req.user.role !== "admin") {
      return sendResponse(res, 403, "You are not allowed to update this user!");
    }

    // Mise à jour des données utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    sendResponse(res, 200, "User updated successfully!", updatedUser);
  });
};
