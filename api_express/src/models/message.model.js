import mongoose from "mongoose"

//* Définition du modèle Message
const Message = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId, //* Associe ce champ à un utilisateur (référence à un autre modèle, par exemple `User`)
      		ref: 'User', //* Spécifie que `user` fait référence au modèle `User`
			required: true
		},
		content: {
				type: String,
				required: true, 
				maxlength: 500
		}		
	},
	{
		//* Ajout automatique des champs `createdAt` et `updatedAt`
		timestamps: true,
	}
)
export default mongoose.model('Message', Message)