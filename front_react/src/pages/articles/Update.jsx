import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

// Fonction pour modifier l'article via axios
const UpdateArticle = () => {

	const [article, setArticle] = useState({})
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
	const { id } = useParams()
	const navigate = useNavigate()

	// Récupérer les données de l'article à modifier
	useEffect(() => {
		const fetchArticleById = async () => {
			try {
				const { data } = await axios.get(`https://richard.bonnegent.fr/nodejs/api/article/update/${id}`)
				setArticle(data.data)
			} catch (error) {
				// Si une erreur survient, on l'affiche dans la console
				console.error(error.message)
			}
		}
		fetchArticleById()
	}, [id])

	// Synchroniser les données récupérées avec le formulaire
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

	// Gérer les changements du formulaire
	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData(prevState => ({ ...prevState, [name]: value }))
	}

	// Gérer la sélection des images
	const handleFileChange = (event) => {
		const { name, files } = event.target
		setImages({
			...images,
			[name]: files[0] // On ne garde que le premier fichier choisi
		})
	}

	// Envoi des données via Axios
	const handleSubmit = async (event) => {
		event.preventDefault()

		const formPayload = new FormData()

		// Ajouter des données textuelles au FormData
		Object.keys(formData).forEach(key => formPayload.append(key, formData[key]))

		// Ajouter des images au FormData
		Object.entries(images).forEach(([key, file]) => {
			if (file) formPayload.append(key, file)	// Vérifier si un fichier existe			
		})

		// Envoi de la requête PUT à l'API avec l'ID spécifié
		try {
			const response = await axios.put(`https://richard.bonnegent.fr/nodejs/api/article/update/${id}`, formPayload, {

				// Définir l'en-tête
				headers: { 'Content-Type': 'multipart/form-data' }
			})
			console.log('Réponse de l\'API:', response.data)

			// Mise à jour du message
			setMessage({ text: "Article modifié avec succès!", type: "success" })

			// Redirection automatique vers la page de l'article
			setTimeout(() => {
				navigate(`/article/${id}`)
			}, 2000)

		} catch (error) {
			setMessage({ text: "Erreur lors de la modification de l'article.", type: "error" })
		}
	}

	return (
		<div className="container my-5">
			<h1 className="text-center text-primary mb-4">Modifier l'Article</h1>
			{message.text && (
				<p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>
			)}
			<form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light">
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