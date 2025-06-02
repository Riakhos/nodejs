import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../css/register.css'

const Register = () => {

	// Déclaration des états pour les champs du formulaire 
	const [prenom, setPrenom] = useState('')
	const [avatar, setAvatar] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// Récupérer la fonction d'inscription du contexte
	const { register } = useContext(AuthContext)

	// Pour rediriger l'utilisateur
	const navigate = useNavigate()

	// Fonction pour gérer la soumission du formulaire d'inscription
	const handleSubmit = async (event) => {
		event.preventDefault()

		// Appel de la fonction d'inscription
		const success = await register(prenom, avatar, email, password)

		// Si l'inscription a réussi, rediriger vers la page de connexion
		if (success) {
			navigate('/login')
			alert('Inscription réussie ! Veuillez vous connecter.')
		} else {
			alert('Une erreur s\'est produite lors de l\'inscription.')
		}
	}	

	return (
		<div className="container d-flex justify-content-center mt-5">
            <form onSubmit={handleSubmit} className="w-100 p-4 rounded shadow bg-light">
                <h2 className="text-center mb-4">Inscription</h2>

                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        value={prenom}
                        onChange={(event) => setPrenom(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">Avatar URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="avatar"
                        value={avatar}
                        onChange={(event) => setAvatar(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
            </form>
        </div>
	)
}

export default Register
