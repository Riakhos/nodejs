import React from "react"

const Footer = () => {
	return (
		<footer className="bg-dark text-white mt-auto py-4">
			<div className="container">
				<div className="row">

					{/* Section À propos */}
					<div className="col-md-4">
						<h5>À propos</h5>
						<p>
							MonSite est une plateforme dédiée à partager des articles
							intéressants sur divers sujets. Nous croyons en l'apprentissage
							continu et en l'innovation.
						</p>
					</div>
				
					{/* Section Contact */}
					<div className="col-md-4">
						<h5>Contact</h5>
						<p>Email: contact@monsite.com</p>
						<p>Téléphone: +33 6 12 34 56 78</p>
					</div>

					{/* Section Réseaux sociaux */}
					<div className="col-md-4">
						<h5>Suivez-nous</h5>
						<a href="https://facebook.com" className="text-white d-block">Facebook</a>
						<a href="https://twitter.com" className="text-white d-block">Twitter</a>
						<a href="https://linkedin.com" className="text-white d-block">LinkedIn</a>
					</div>
				</div>
				<div className="text-center mt-3">
					<p>© 2024 MonSite. Tous droits réservés.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
