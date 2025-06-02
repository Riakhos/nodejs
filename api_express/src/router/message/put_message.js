import express from "express"
import Message from "../../models/message.model.js"
import sendResponse from "../../utils/sendResponse.js"
import authenticate from "../../middlewares/authenticate.js"
import { validateMessageInputUpdate, validateMessageId } from "../../middlewares/validators/message.validator.js"
import { validationResult } from "express-validator"

const router = express.Router()

// Route PUT /update/:idMessage : Mettre à jour un message
router.put("/update/:idMessage", authenticate, validateMessageId, validateMessageInputUpdate, async (req, res) => {

    //* Récupère les erreurs de validation dans la requête
    const errors = validationResult(req)

    //* Si des erreurs existent, retourne une réponse 400 avec les détails
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, "Entrées invalides.", errors.array())
    }

    //* Récupérer l'ID de l'utilisateur authentifié
    const userId = req.userId
    const { idMessage } = req.params
    const { content } = req.body

    try {
        //* Trouver et mettre à jour le message
        const message = await Message.findById(idMessage).populate(
            "user",
            "firstname lastname"
        )

        if (!message) {
            return sendResponse(res, 404, "Message non trouvé.");
        }

        //* Vérifier si l'utilisateur authentifié est le créateur du message
        if (message.user._id.toString() !== userId) {
            return sendResponse(res, 403, "Vous n'avez pas la permission de modifier ce message.")
        }

        //* Mettre à jour le message
        message.content = content
        const updatedMessage = await message.save()

        sendResponse(res, 200, "Message mis à jour avec succès.", updatedMessage)
        } catch (error) {
            sendResponse(res, 500, "Erreur lors de la mise à jour du message.", error.message)
        }
    }
)

export default router