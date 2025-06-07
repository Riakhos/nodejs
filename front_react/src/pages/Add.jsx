import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


// Fonction pour créer l'article via axios
const AddArticle = () => {
    
    const imgInput = ['img', 'img1', 'img2', 'img3', 'img4']
    
    // Utilisation du Hook
    const [article, setArticle] = useState({
        name: '',
        content: '',
        category: '',
        brand: '',
        price: 0,
        picture: {
            img: '',
            img1: '',
            img2: '',
            img3: '',
            img4: ''
        },
        status: true,
        stock: 0
    })
	const navigate = useNavigate()
    
    // États locaux pour gérer le formulaire
    const [message, setMessage] = useState({ text: '', type: '' })

    // Gérer les changements des champs texte
    const handleChange = (e) => {
        const { name, value } = e.target

        // Vérifier si le nom du champ (name) commence par "img"
        if (name.startsWith('img')) {
            
            // prev est un paramètre de la fonction de callback passée à setArticle qui représente la valeur précédente (actuelle) de l'état (state) avant la mise à jour(assurer que nous mettons à jour l'état en nous basant sur sa version la plus récente)
            setArticle(prev => ({ ...prev, picture: { 
                ...prev.picture, 
                [name]: e.target.files[0] }
            }))
        } else {
            setArticle(prev => ({ ...prev, [name]: value }))
        }
    }
    
    // Validation basique avant l'envoi
    const validateForm = () => {
        if (
            !article.name ||
            !article.content ||
            !article.category ||
            !article.brand ||
            !article.price ||
            !article.status
        ) {

            // Mise à jour du message
            setMessage({ text: "Veuillez remplir tous les champs obligatoires du formulaire!", type: 'error' })
            return false
        }
        return true
    }
    
    // Envoi des données via Axios
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return
        
        try {
            const { data } = await axios.post('https://richard.bonnegent.fr/react/api/article/add', article)
            console.log(data.data)
            // Récupérer l'ID de l'article créé
            const newArticleId = data.data._id

            // Mise à jour du message
            setMessage({ text: 'Article créé avec succès!', type: 'success' })

            // // Mise à jour des images
            // setImages({})

            // Redirection automatique vers la page de l'article
			setTimeout(() => {
				navigate(`/article/${newArticleId}`)
			}, 2000)

        } catch (error) {
            setMessage({ text: 'Échec de l\'ajout de l\'article.', type: 'error' })
        }
    }

    return (
        <div className="container my-5">
            <h1 className="text-center text-primary mb-4">Ajouter un Nouvel Article</h1>

            {/* Messages d'erreur */}
            {message.text && <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>{message.text}</p>}

            {/* Formulaire de l'article */}
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light">

            {/* Informations sur l'article */}
                {['name', 'category', 'brand', 'price', 'stock'].map((field) => (
                    <div className="mb-3" key={field}>
                        <label htmlFor={field} className="form-label">
                            {field.charAt(0).toUpperCase() + field.slice(1)} :
                        </label>
                        <input
                            type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                            id={field}
                            name={field}
                            value={article[field]}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                ))}
                
                {/* Type : Textarea */}
                <label htmlFor="content" className="form-label">Description : </label>
                <textarea 
                    className="form-control"
                    name="content"
                    onChange={handleChange}
                    required
                />

                {/* Type : Checkbox */}
                <div className="form-check">
                    <label htmlFor="status" className="form-label">Statut :</label>
                    <input
                    type="checkbox"
                    name="status"
                    checked={article.status}
                    onChange={(e) => setArticle(prev => ({ ...prev, status: e.target.checked }))}
                    className="form-check-input"
                    />
                </div>

                {/* Image de l'article */}
                {imgInput.map((imgName, index) => (
                    <div className="mb-3" key={imgName}>
                        <label className="form-label">
                            {index === 0 ? 
                                'Image principale (URL):' 
                                : 
                                `Image ${index} (URL):`
                            }
                        </label>
                        <input
                            type="file"
                            name={imgName}
                            onChange={handleChange}

                            // slice prend le dernier caractère du nom de l'image (par exemple, pour 'img1', il extrait '1', ok ok ;) ? ) 
                            placeholder={`Image ${imgName.slice(-1)}`}
                            className="form-control"
                            required
                        />
                    </div>
                ))}

				{/* Actions */}
                <button type="submit" className="btn btn-primary w-100 m-4">
                    Ajouter l'article
                </button>
            </form>
        </div>
    )
}

export default AddArticle