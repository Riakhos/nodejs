import mongoose from "mongoose";
import { sendResponse } from "./send_response.js";

/**
 * Valide si un ID est présent et valide pour MongoDB.
 * @param {string} id - L'identifiant à valider.
 * @param {object} res - L'objet réponse Express.
 * @returns {boolean} - Renvoie `true` si l'ID est valide, sinon `false`.
 */
export const validateObjectId = (id, res) => {

    if (!id) {
        sendResponse(res, 400, "Missing ID in request parameters.");
        return false; //* Ajouté pour arrêter l'exécution si l'ID est manquant
    };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        sendResponse(res, 400, "Invalid ID format.");
        return false; //* Ajouté pour indiquer que l'ID est invalide
    };

    return true; //* ID valide

};

