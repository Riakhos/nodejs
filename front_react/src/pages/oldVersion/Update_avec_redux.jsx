import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Importation des actions de Redux
import * as ACTIONS from '../redux/reducers/article.reducer'

// Fonction pour modifier l'article via axios
const UpdateArticle = () => {

	// Utilisation du Hook
	const dispatch = useDispatch()
	const { id } = useParams()
	const navigate = useNavigate()

	// États locaux pour gérer le formulaire
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        content: '',
        category: '',
        brand: '',
        status: true,
        stock: 1
    })
	const [images, setImages] = useState({})
	const [message, setMessage] = useState({ text: '', type: '' })
	
	// Récupération des données depuis le store Redux
	const article = useSelector((state) => state.article.detail)
	const loading = useSelector((state) => state.article.loading)
	const error = useSelector((state) => state.article.error)



	// Récupérer l'article à modifier
	useEffect(() => {
		if (!article || article._id !== id) {

			// Dispatch de l'action de démarrage
			dispatch(ACTIONS.FETCH_ARTICLE_DETAIL_START())

			// Récupère l'article par son id
			const fetchArticleById = async () => {
				try {
					const { data } = await axios.get(`https://richard.bonnegent.fr/react/api/article/update/${id}`)

					// Dispatch de l'action d'affichage
					dispatch(ACTIONS.FETCH_ARTICLE_DETAIL_SUCCESS(data.data))

				} catch (error) {

					// Dispatch de l'action d'erreur
					dispatch(ACTIONS.FETCH_ARTICLE_FAILURE(error.message))
				}
			}
			fetchArticleById()
		}
	}, [dispatch, id, article])

	// Synchroniser les données de l'article avec le formulaire
	useEffect(() => {
		if (article) {
			setFormData({
				name: article.name || "",
				price: article.price || "",
				content: article.content || "",
				category: article.category || "",
				brand: article.brand || "",
				status: article.status || true,
				stock: article.stock || 1,
			})
		}
	}, [article])

	// Gérer les changements dans le formulaire
	const handleChange = (event) => {

		const { name, value } = event.target

		setFormData(prevState => ({ 
			...prevState,
			[name]: value
		}))
	}

	// Gérer les changements dans les fichiers d'images
	const handleFileChange = (event) => {

		const { name, files } = event.target

		setImages({
			...images,
			
			// On ne garde que le premier fichier choisi
			[name]: files[0] 
		})
	}

	// Envoi des données via Axios
	const handleSubmit = async (event) => {

		event.preventDefault()

		const formPayload = new FormData()

		// Ajouter des données textuelles au FormData
		Object
			.keys(formData)
			.forEach(key => formPayload.append(
				key,
				formData[key]
			))

		// Ajouter des images au FormData
		Object
			.entries(images)
			.forEach(([key, file]) => {
				
				// Vérifier si un fichier existe			
				if (file) formPayload.append(key, file)	
			})

		// Confirmation avant modification
        if (!window.confirm('Êtes-vous sûr de vouloir modifier cet article ?')) return

		// Envoi de la requête PUT à l'API avec l'ID spécifié
		try {
			
			await axios.put(`https://richard.bonnegent.fr/react/api/article/update/${id}`, formPayload, {

				// Définir l'en-tête
				headers: { 'Content-Type': 'multipart/form-data' }
			})

			// Mise à jour du message
			setMessage({ text: "Article modifié avec succès!", type: "success" })

			// Redirection automatique vers la page de l'article
			setTimeout(() => {
				navigate(`/detail/${id}`)
			}, 2000)

		} catch (error) {
			setMessage({ text: "Erreur lors de la modification de l'article.", type: "error" })
		}
	}

	// Gestion des états de chargement et d'erreur
	if (loading) return <div className="text-center my-4">Chargement en cours...</div>
	if (error) return <div className="alert alert-danger text-center">Erreur : {error}</div>

	return (
		<div className="container my-5">
			<h1 className="text-center text-primary mb-4">Modifier l'Article</h1>

			{message.text && (
				<p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>
			)}
			
			{/* Formulaire de l'article */}
			<form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light">
				
				{/* Informations sur l'article */}
				{["name", "price", "content", "category", "brand", "stock"].map((field) => (
					<div className="mb-3" key={field}>
						<label htmlFor={field} className="form-label">
							{field.charAt(0).toUpperCase() + field.slice(1)} :
						</label>
						<input
							type={field === "price" || field === "stock" ? "number" : "text"}
							id={field}
							name={field}
							value={formData[field]}
							onChange={handleChange}
							className="form-control"
							required
						/>
					</div>
				))}

				{/* Image de l'article */}
				{["image", "img1", "img2", "img3", "img4"].map((field, index) => (
					<div className="mb-3" key={index}>
						<label htmlFor={field} className="form-label">
							Image {index + 1} :
						</label>
						<input
							type="file"
							id={field}
							name={field}
							onChange={handleFileChange}
							className="form-control"
						/>
					</div>
				))}

				{/* Actions */}
				<div className="d-flex justify-content-between m-4">
					<button type="submit" className="btn btn-primary">{'Enregistrer les modifications'}</button>
					<button type="button" className="btn btn-secondary ms-4" onClick={() => navigate(-1)}>
						Annuler
					</button>
				</div>
			</form>
		</div>
	)
}

export default UpdateArticle