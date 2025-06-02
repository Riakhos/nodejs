import express from "express"
import User from "../../models/user.model.js"
import sendResponse from "../../utils/sendResponse.js"

const router = express.Router()

// Route PUT /update/:idUser : Mettre à jour un utilisateur
router.put("/update/:idUser", async (req, res) => {
    try {
        const { idUser } = req.params
        const updates = req.body

        //* Trouver et mettre à jour l'utilisateur
        const updatedUser = await User.findByIdAndUpdate(idUser, updates, { new: true })

        if (!updatedUser) {
            return sendResponse(res, 404, "Utilisateur non trouvé.")
        }

        sendResponse(res, 200, "Utilisateur mis à jour avec succès.", updatedUser)
    } catch (error) {
        sendResponse(res, 500, "Erreur lors de la mise à jour de l'utilisateur.", error.message)
    }
})

export default router