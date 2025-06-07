import React, { useState } from "react"
import axios from "axios"
import "../css/search.css"

const SearchForm = () => {

	// États pour les filtres, les articles et l'état de chargement
	const [filters, setFilters] = useState({
		name: "",
		category: "",
		price: "",
		brand: "",
	})

	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(false)

	// Gestion des changements dans les champs de formulaire
	const handleChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value })
	}

	// Gestion de la soumission du formulaire
	const handleSearch = async (e) => {

		// Empêche le rechargement de la page
		e.preventDefault()

		// Affiche l'état de chargement
		setLoading(true)
		try {
			const { data } = await axios.get("https://richard.bonnegent.fr/nodejs/api/article/search", { params: filters })

			// Met à jour les résultats
			setArticles(data.data)
		} catch (error) {
			console.error("Erreur lors de la recherche :", error)
		}

		// Fin du chargement
		setLoading(false)
	}

	return (
		<div className="container mt-4">
			<form className="card p-4 shadow-sm bg-light" onSubmit={handleSearch}>
				<h2 className="text-center text-primary mb-4">Rechercher des Articles</h2>

				{/* Champs de formulaire */}
				{["name", "category", "brand", "price"].map((field) => (
					<div className="mb-3" key={field}>
						<label htmlFor={field} className="form-label">
							{field === "price" ? "Prix max (€)" : field.charAt(0).toUpperCase() + field.slice(1)}
						</label>
						<input
							type={field === "price" ? "number" : "text"}
							id={field}
							name={field}
							placeholder={`Entrez ${field}`}
							value={filters[field]}
							onChange={handleChange}
							className="form-control"
						/>
					</div>
				))}

				<button type="submit" className="btn btn-primary w-100">
					Rechercher
				</button>
			</form>

			{/* Affichage des résultats */}
			{loading ? (
				<p>Chargement...</p>
			) : (
				<div className="mt-4">
					{articles.length === 0 ? (
						<p>Aucun article trouvé.</p>
					) : (
						articles.map((article) => (
							<div className="card mb-3" key={article._id}>
								<div className="row g-0">
									<div className="col-md-4">
										<img
											src={article.picture?.img}
											alt={article.name}
											className="img-fluid rounded-start"
										/>
									</div>
									<div className="col-md-8">
										<div className="card-body">
											<h5 className="card-title">{article.name}</h5>
											<p className="card-text">{article.category}</p>
											<p className="card-text">{article.brand}</p>
											<p className="card-text"><strong>{article.price} €</strong></p>
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			)}
		</div>
	)
}

export default SearchForm