import express from "express"
import User from "../../models/user.model.js"
import sendResponse from "../../utils/sendResponse.js"

const router = express.Router()

// Route DELETE /delete/:idUser : Supprimer un utilisateur
router.delete("/delete/:idUser", async (req, res) => {
    try {
        const { idUser } = req.params

        //* Trouver et supprimer l'utilisateur
        const deletedUser = await User.findByIdAndDelete(idUser)

        if (!deletedUser) {
            return sendResponse(res, 404, "Utilisateur non trouvé.")
        }

        sendResponse(res, 200, "Utilisateur supprimé avec succès.", deletedUser)
    } catch (error) {
        sendResponse(res, 500, "Erreur lors de la suppression de l'utilisateur.", error.message)
    }
})

export default router