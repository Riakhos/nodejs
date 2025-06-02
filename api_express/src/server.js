import dotenv from "dotenv"
//* Charger les variables d'environnement depuis un fichier .env
dotenv.config({ path: "../.env" })
import mongoose from "mongoose"
import app from "./app.js"


//* Configuration du port (par défaut 8080)
const PORT = process.env.PORT || 8080

//* Connexion à MongoDB
mongoose
	.connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME} )
	.then(() => {
		console.log('Connection à MongoDB réussi')
	})
	.catch(error => console.error('Erreur lors de la connexion à MongoDB :', error))

//* Lancer le serveur
app.listen(PORT, () => {
	console.log(`Serveur lancé sur le port http://localhost:${PORT}`)
})
