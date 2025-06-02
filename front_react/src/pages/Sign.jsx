import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'

const Sign = () => {

	// États pour l'utilisateur et les erreurs
	const [user, setUser] = useState({})
	const [error, setError] = useState('')

	// Contexte d'authentification
	const { login } = useContext(AuthContext)

	// Gestion des champs du formulaire
	const handleChange = (event) => {
		const { name, value } = event.target
		setUser(prevUser => ({ ...prevUser, [name]: value }))
	}

	// Gestion de la soumission du formulaire
	const handleSubmit = async (event) => {
		event.preventDefault()

		try {

			// Appel de la fonction de connexion
			await login(user)

		} catch {

			// Si la connexion échoue, définir un message d'erreur
			setError("Erreur de connexion. Vérifiez votre email et mot de passe.")
		}
	}

	return (
		<div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
			<form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light" style={{ maxWidth: "400px", width: "100%" }}>
				<h2 className="text-center text-primary mb-4">Connexion</h2>

				{/* Message d'erreur */}
				{error && <div className="alert alert-danger">{error}</div>}

				{/* Champs de formulaire */}
				{["email", "password"].map((field) => (
					<div className="mb-3" key={field}>
						<label htmlFor={field} className="form-label">
							{field === "email" ? "Email" : "Mot de passe"}
						</label>
						<input
							type={field === "email" ? "email" : "password"}
							id={field}
							name={field}
							className="form-control"
							required
							onChange={handleChange}
						/>
					</div>
				))}

				<Link to="/reset-password" className="d-block text-center mb-3 text-decoration-none text-primary">
					Mot de passe oublié ?
				</Link>

				{/* Boutons */}
				<button type="submit" className="btn btn-primary w-100 mb-3">Se connecter</button>

				<Link to="/register" className="d-block text-center">
					<button type="button" className="btn btn-success w-100">Créer un compte</button>
				</Link>
			</form>
		</div>
	)
}

export default Sign