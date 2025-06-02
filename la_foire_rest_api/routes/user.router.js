import express from "express";
import { verifieToken } from "../middlewares/auth.middleware.js";

import * as CONTROLLER from "../controllers/user.controller.js";

const router = express.Router();

// Inscription de l'utilisateur
router.post("/signup", CONTROLLER.signup);

// Connexion de l'utilisateur (pas besoin de vérifier le token ici)
router.post("/sign", CONTROLLER.sign);

// Récupérer tous les utilisateurs (optionnel : sécuriser avec verifieToken)
router.get("/get", verifieToken, CONTROLLER.getUsers);

// Récupérer un utilisateur par ID
router.get("/get/:id", verifieToken, CONTROLLER.getUserById);

// Supprimer un utilisateur (nécessite un token)
router.delete("/delete/:id", verifieToken, CONTROLLER.deleteUser);

// Réactiver un utilisateur désactivé
router.put("/reactivate/:id", verifieToken, CONTROLLER.reactivateUser);

// Mettre à jour les informations d'un utilisateur
router.put("/update/:id", verifieToken, CONTROLLER.updateUser);

export default router;
