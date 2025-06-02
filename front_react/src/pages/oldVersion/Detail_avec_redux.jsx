import React, { useEffect, memo } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

// Importation des actions de Redux
import * as ACTIONS from '../redux/reducers/article.reducer'

const Article = memo(() => {

    // Utilisation du Hook
    const dispatch = useDispatch()
    const { id } = useParams()
	const navigate = useNavigate()

    // Sélectionner l'article détaillé et l'état du store
    const article = useSelector((state) => state.article.detail)
    const loading = useSelector((state) => state.article.loading)
    const error = useSelector((state) => state.article.error)

	// Afficher l'article via axios
    useEffect(() => {

        if (!article || article._id !== id) {

            // Dispatch de l'action de démarrage
            dispatch(ACTIONS.FETCH_ARTICLE_DETAIL_START())
            
            // Récupère l'article par son id
            const fetchArticleById = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:8000/api/article/get/${id}`)

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

    // Fonction pour supprimer l'article
    const handleDelete = async () => {

        // Confirmation avant suppression
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

        // Envoi de la requête DELETE à l'API avec l'ID spécifié
        try {

            // Suppression via API
            await axios.delete(`http://localhost:8000/api/article/delete/${id}`)

            // Dispatch de l'action de suppression
            dispatch(ACTIONS.DELETE_ARTICLE_DETAIL(id))
            
            // Redirection vers la liste des articles
            navigate('/')
                
        } catch (error) {
            
            // Dispatch de l'action d'erreur
            dispatch(ACTIONS.FETCH_ARTICLE_FAILURE(error.message))
        }
    }

    // Gestion des états de chargement et d'erreur
    if (loading) return <div className="text-center my-4">Chargement en cours...</div>
    if (error) return <div className="alert alert-danger text-center">Erreur : {error}</div>

    // Affichage des détails de l'article
    return (
        <div className="container my-4">
            <h1 className="text-center text-primary mb-4">Détails de l'Article</h1>
            {article && (
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
                        <div className="d-flex justify-content-start gap-3">
                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Supprimer l'article
                            </button>
                            <Link
                                to={`/update/${id}`}
                                className="btn btn-primary"
                            >
                                Modifier l'article
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
})

export default Article