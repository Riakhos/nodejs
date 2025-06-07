import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Importation des actions de Redux
import * as ACTIONS from '../redux/reducers/article.reducer'

const Home = () => {

    // Utilisation du Hook useDispatch pour gérer les actions de Redux
    const dispatch = useDispatch()

    // Sélectionner l'article détaillé et l'état du store
    const store = useSelector( state => state.article.data)
    const loading = useSelector((state) => state.article.loading)
    const error = useSelector((state) => state.article.error)
    console.log("Articles affichés dans Home :", store)
    
    // Hook useEffect pour gérer les articles
    useEffect(() => {
        
        // Dispatch de l'action de démarrage
        dispatch(ACTIONS.FETCH_ARTICLE_START())
        
        const fetchArticles = async () => {

            try {

                // Récupère les articles
                const { data } = await axios.get('https://richard.bonnegent.fr/nodejs/api/article/all')

                // Dispatch de l'action d'affichage
                dispatch(ACTIONS.FETCH_ARTICLE_SUCCESS(data.data))
            } catch (error) {

                // Dispatch de l'action d'erreur
                dispatch(ACTIONS.FETCH_ARTICLE_FAILURE(error.message))
            }
        }
        fetchArticles()
    }, [dispatch]) // S'exécutera à l'affichage de notre composant

    if (loading) return <div className="text-center my-4">Chargement en cours...</div>

    if (error) return <div className="alert alert-danger text-center">Erreur : {error}</div>

    return (
        <div className="container my-4">
            <h1 className="text-center text-primary">Liste des Articles</h1>
            <div className="row g-4">
                {store &&
                    store.map((article) => (
                        <div key={article._id} className="col-md-4">
                            <div className="card h-100 shadow-sm bg-light">

                                {/* Actions */}
                                <Link to={`/detail/${article._id}`} className="text-decoration-none text-dark">

                                    {/* Informations sur l'article */}
                                    <img
                                        src={article.picture?.img}
                                        alt={article.name}
                                        className="card-img-top img-fluid"
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />

                                    {/* Informations sur l'article */}
                                    <div className="card-body">
                                        <h5 className="card-title">{article.name}</h5>
                                        <p className="card-text text-primary fw-bold">{article.price} €</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )    
}

export default Home
