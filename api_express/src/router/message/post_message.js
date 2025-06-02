import express from "express"
import Message from "../../models/message.model.js"
import User from "../../models/user.model.js"
import sendResponse from "../../utils/sendResponse.js"
import { validateMessageInputCreate } from "../../middlewares/validators/message.validator.js"
import { validationResult } from "express-validator"

const router = express.Router()

// Route POST /add : Ajouter un nouveau message
router.post("/add", validateMessageInputCreate, async (req, res) => {

    //* Récupère les erreurs de validation dans la requête
    const errors = validationResult(req)

    //* Si des erreurs existent, retourne une réponse 400 avec les détails
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, "Entrées invalides.", errors.array())
    }

    const { user, content } = req.body

    try {
        //* Vérifier que l'utilisateur existe dans la base de données
        const existingUser = await User.findById(user)
        if (!existingUser) {
        return sendResponse(res, 404, "Utilisateur non trouvé.")
        }

        //* Créer un nouveau message
        const newMessage = new Message({ user, content })

        //* Sauvegarder le message dans MongoDB
        const savedMessage = await newMessage.save()

        //* Ajouter les champs `nom` et `prenom` de l'utilisateur
        const populatedMessage = await savedMessage.populate(
        "user",
        "firstname lastname"
        )

        sendResponse(res, 201, "Message ajouté avec succès.")
    } catch (error) {
        sendResponse(res, 500, "Erreur serveur.", error.message)
    }
})

export default router