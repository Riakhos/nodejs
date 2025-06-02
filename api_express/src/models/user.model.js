import mongoose from "mongoose"

//* Définition du modèle User
const User = mongoose.Schema(
	{
		firstname: {
			type: String,
			minLength: 3,
			maxLength: 20,
			required: true
		},
		lastname: {
			type: String,
			minLength: 3,
			maxLength: 20,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			minLength: 8,
			required: true
		}
	},
	{
		//* Ajout automatique des champs `createdAt` et `updatedAt`
		timestamps: true,
	}
)
export default mongoose.model('User', User)