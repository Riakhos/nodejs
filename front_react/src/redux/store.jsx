import { configureStore } from "@reduxjs/toolkit"

import Article from './reducers/article.reducer'

/**
 * Redux Store
	 * Rôle : 
		* Centralise les états globaux pour votre application 
			* articles
			* chargement
			* erreurs
			* etc
	 * Fonctionnalité principale :
		* Configure le store Redux avec le réducteur des articles
		* Permet de partager l'état entre les différents composants sans passer de props
 */

// Reducers
export default configureStore({
	reducer: {
		article: Article
	}
})