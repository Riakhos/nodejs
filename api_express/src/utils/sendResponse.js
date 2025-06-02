//* Fonction pour uniformiser le format des réponses
const sendResponse = (res, status, message, data = null) => {
    res.status(status).json({ response: message, data })
}
export default sendResponse