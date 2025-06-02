import React from 'react'
import { Link } from 'react-router-dom'

const Nothing = () => {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
			<h1 className="text-danger">Rien ici 😒 404</h1>
			<Link to='/' className="btn btn-primary mt-3">Retour à l'accueil</Link>
		</div>
	)
}

export default Nothing