import express from "express"
import User from "../../models/user.model.js"
import sendResponse from "../../utils/sendResponse.js"

const router = express.Router()

// Route POST /add : Ajouter un nouvel utilisateur
router.post("/add", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body

        //* Créer un nouvel utilisateur
        const newUser = new User({ firstname, lastname, email, password })
        //* Sauvegarder l'utilisateur dans MongoDB
        const savedUser = await newUser.save();

        sendResponse(res, 201, "Utilisateur ajouté avec succès.", savedUser)
    } catch (error) {
        sendResponse(res, 500, "Erreur lors de l'ajout de l'utilisateur.", error.message)
    }
})
export default router