import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const authenticate = (req, res, next) => {

	//* Extraire le token du header Format: "Bearer <token>"
	const token = req.headers.authorization?.split(" ")[1]

	//* Vérifier si le token est absent
	if (!token) {
		return res.status(401).json({ response: "Accès non autorisé. Token manquant." })
	}

	try {

		//* Vérifier la validité du token et Remplacez par votre clé JWT
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		//* Extraire et injecter l’ID utilisateur dans la requête
		req.userId = decoded.id

		next()

	} catch (error) {
		console.error("Erreur lors de la vérification du token:", error)
		return res.status(401).json({ response: "Token invalide ou expiré." })
	}
};

export default authenticate
