import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from "react-router-dom"

const Article = () => {

    // Utilisation du Hook
    const [article, setArticle] = useState({})
	const [message, setMessage] = useState('')
    const { id } = useParams()
	const navigate = useNavigate()

	// Fonction pour afficher l'article via axios
    useEffect(() => {

        // Fonction pour Récupérer l'article par son id
        const fetchArticleById = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/api/article/get/${id}`
                )
				setArticle(data.data)

            } catch (error) {
                
                // Si une erreur survient, on l'affiche dans la console
				console.error(error.message)
            }
        }

        fetchArticleById()
    }, [id]) // S'exécutera à l'affichage de notre composant et à chaque changement d'états

	// Fonction pour supprimer l'article
    const handleDelete = async () => {

		// Confirmation avant suppression
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

        try {

            // Suppression via API
            await axios.delete(`http://localhost:8000/api/article/delete/${id}`)
            setMessage('Article supprimé avec succès!')

			// Redirection après suppression
            setTimeout(() => {
                
                // Redirection vers la liste des articles
                navigate('/')

            // Attendre 2 secondes avant la redirection
            }, 2000) 

        } catch (error) {
            setMessage('Échec de la suppression de l\'article.')
            console.error(error.message)
        }
    }
	

    return (
        <div className="container my-4">
            <h1 className="text-center text-primary">Détails de l'Article</h1>
            {message && (
                <div
                    className={`alert text-center ${message.includes("succès") ? "alert-success" : "alert-danger"}`}
                >
                    {message}
                </div>
            )}
            <div className="row align-items-center rounded shadow bg-light">

                {/* Image de l'article */}
                <div className="col-md-6 ps-0">
                    <img
                        src={article.picture?.img}
                        alt={article.name}
                        className="img-fluid rounded shadow-sm"
                    />
                </div>

                {/* Informations sur l'article */}
                <div className="col-md-6">
                    <h2 className="text-primary">{article.name}</h2>
                    <p className="text-secondary">{article.content}</p>
                    <p className="text-success fw-bold">{article.price} €</p>
                    
                    {/* Actions */}
                    <div className="d-flex gap-2">
                        <button className="btn btn-danger" onClick={handleDelete}>
                            Supprimer l'article
                        </button>
                        <Link to={`/update/${id}`} className="btn btn-primary">
                            Modifier l'article
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Article