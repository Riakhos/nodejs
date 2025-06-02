import { body, param } from "express-validator"

//* Validation pour la création d'un message
export const validateMessageInputCreate = [
    body('content').isString().notEmpty().withMessage('Le contenu du message est requis.'),
    body('user').isMongoId().withMessage('ID utilisateur invalide.')
]

//* Validation pour la mise à jour d'un message
export const validateMessageInputUpdate = [
    body('content').isString().notEmpty().withMessage('Le contenu du message est requis.')
]

//* Validation pour l'ID de message dans les routes GET, PUT, et DELETE
export const validateMessageId = [
    param('idMessage').isMongoId().withMessage('ID de message invalide.')
]
