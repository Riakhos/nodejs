import express from "express"
import Message from "../../models/message.model.js"
import sendResponse from "../../utils/sendResponse.js"
import authenticate from "../../middlewares/authenticate.js"
import { validateMessageId } from "../../middlewares/validators/message.validator.js"

const router = express.Router()

// Route DELETE /delete/:idMessage : Supprimer un message
router.delete("/delete/:idMessage", authenticate, validateMessageId, async (req, res) => {

    //* Récupérer l'ID de l'utilisateur authentifié
    const userId = req.userId
    const { idMessage } = req.params

        try {

            //* Trouver et supprimer le message
            const message = await Message.findById(idMessage).populate("user", "firstname lastname")

            if (!message) {
                return sendResponse(res, 404, "Message non trouvé.")
            }

            //* Vérifier si l'utilisateur authentifié est le créateur du message
            if (message.user._id.toString() !== userId) {
                return sendResponse(res, 403, "Vous n'êtes pas autorisé à supprimer ce message.")
            }

            //* Supprimer le message
            await Message.findByIdAndDelete(idMessage)

            //* Préparer la réponse détaillée avec le prénom et le nom de l'utilisateur
            const responseData = {
                messageId: message._id,
                content: message.content,
                user: {
                firstname: message.user.firstname,
                lastname: message.user.lastname,
                },
                status: "Message supprimé avec succès.",
            }

            sendResponse(res, 200, "Message supprimé avec succès.", responseData)
        } catch (error) {
            sendResponse(res, 500, "Erreur lors de la suppression du message.", error.message)
        }
    }
)

export default router