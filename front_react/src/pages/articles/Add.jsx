import React, { useState } from "react"
import axios from 'axios'

const AddArticle = () => {
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

    // Gérer les changements des champs texte
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
        Object.keys(formData).forEach(key => formPayload.append(key, formData[key]))

        // Ajouter les images au FormData
        Object.entries(images).forEach(([key, file]) => {
            if (file) formPayload.append(key, file)
        })

        try {
            await axios.post('https://richard.bonnegent.fr/nodejs/api/article/add', formPayload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setMessage({ text: 'Article ajouté avec succès!', type: 'success' })
            setFormData({ name: '', price: '', content: '', category: '', brand: '', status: true, stock: 1 })
            setImages({})
        } catch (error) {
            setMessage({ text: 'Échec de l\'ajout de l\'article.', type: 'error' })
        }
    }

    return (
        <div className="container my-5">
            <h1 className="text-center text-primary mb-4">Ajouter un Nouvel Article</h1>
            {message.text && <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>{message.text}</p>}
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light">
                {['name', 'price', 'content', 'category', 'brand'].map((field) => (
                    <div className="mb-3" key={field}>
                        <label htmlFor={field} className="form-label">
                            {field.charAt(0).toUpperCase() + field.slice(1)} :
                        </label>
                        <input
                            type={field === 'price' ? 'number' : 'text'}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                ))}
                {['image', 'img1', 'img2', 'img3', 'img4'].map((field, index) => (
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
                <button type="submit" className="btn btn-primary w-100 m-4">
                    Ajouter l'article
                </button>
            </form>
        </div>
    )
}

export default AddArticle