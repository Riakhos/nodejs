import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'

const Header = () => {

	// Récupérer l'utilisateur du contexte
	const { auth, logout } = useContext(AuthContext)
	
	return (
		<header>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/">Mon Site</NavLink>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item">
								<NavLink className="nav-link" to="/">Accueil</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/search">Recherche</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/contact">Contact</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/about">À propos</NavLink>
							</li>
							<li className="nav-item">
								{auth ? (
									<button className="btn btn-outline-danger" onClick={logout}>Déconnexion</button>
								) : (
									<NavLink className="btn btn-outline-primary" to="/sign">Connexion</NavLink>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header