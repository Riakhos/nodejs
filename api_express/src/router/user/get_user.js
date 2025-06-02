import express from "express"
import User from "../../models/user.model.js"
import sendResponse from "../../utils/sendResponse.js"

const router = express.Router()

// Route GET /all : Récupérer tous les utilisateurs
router.get("/all", async (req, res) => {
    try {
        //* Récupérer tous les utilisateurs depuis MongoDB
        const users = await User.find();
        sendResponse(res, 200, "Liste des utilisateurs récupérée.", users)
    } catch (error) {
        sendResponse(res, 500, "Erreur serveur.", error.message)
    }
})

// Route GET /find/:idUser : Trouver un utilisateur par ID
router.get("/find/:idUser", async (req, res) => {
    try {
        const { idUser } = req.params
        //* Rechercher l'utilisateur par idUser MongoDB
        const user = await User.findById(idUser)

        if (!user) {
            return sendResponse(res, 404, "Utilisateur non trouvé.")
        }

        sendResponse(res, 200, "Utilisateur trouvé.", user)
    } catch (error) {
        sendResponse(res, 500, "Erreur serveur.", error.message)
    }
})
export default router