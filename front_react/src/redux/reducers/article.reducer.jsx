import { createSlice } from '@reduxjs/toolkit'

/** 
 * Article Reducer
	 * Rôle :
		 * Gère les états des articles dans Redux :
			 * chargement
			 * liste
			 * détails
			 * erreurs
	 * Fonctionnalité principale :
		 * Contient des actions pour démarrer le chargement
			 * enregistrer les données récupérées 
			 * signaler une erreur
		 * Ajoute la gestion des détails d’un article spécifique avec une action dédiée
			 * FETCH_ARTICLE_DETAIL_SUCCESS
	 * Améliorations apportées :
		 * Centralisation de la logique des articles dans Redux
		 * Introduction de l'état detail pour éviter de recharger inutilement un article si ses détails ont déjà été récupérés
 */

const initialState = {
	data: [],
	loading: null,
	error: false,
	detail: null
}

export const Article = createSlice({
	name: 'Article',
	initialState,
	reducers: {
		FETCH_ARTICLE_START: (store) => {
			store.loading = true
		},
		FETCH_ARTICLE_SUCCESS: (store, actions) => {
			store.loading = false
			store.data = actions.payload
		},
		FETCH_ARTICLE_FAILURE: (store) => {
			store.loading = false
			store.error = true
		},
		FETCH_ARTICLE_DETAIL_START: (store) => {
			store.loading = true
		},
		FETCH_ARTICLE_DETAIL_SUCCESS: (store, actions) => {
			store.loading = false
			store.detail = actions.payload
		},
		DELETE_ARTICLE_DETAIL: (store, actions) => {
			console.log("Avant suppression :", store.data)
			// Filtrer les articles pour supprimer celui correspondant au payload
			store.data = store.data.filter(article => article._id !== actions.payload)
			console.log("Après suppression :", store.data)
			// Si les détails affichés concernent l'article supprimé, réinitialisez-les
			if (store.detail && store.detail._id === actions.payload) {
				
				// Supprime les détails si l'article supprimé est le même
				store.detail = null
			}
		},
		UPDATE_ARTICLE_DETAIL: (store, actions) => {
			const updatedArticle = actions.payload

			// Mise à jour des détails de l'article
			if (store.detail && store.detail._id === updatedArticle._id) {
				store.detail = updatedArticle;
			}

			// Mise à jour dans la liste globale
			store.data = store.data.map(article =>
				article._id === updatedArticle._id ? updatedArticle : article
			)
		}
	}
})

export const { 
	FETCH_ARTICLE_START, 
	FETCH_ARTICLE_SUCCESS, 
	FETCH_ARTICLE_DETAIL_START, 
	FETCH_ARTICLE_DETAIL_SUCCESS, 
	FETCH_ARTICLE_FAILURE,
	DELETE_ARTICLE_DETAIL,
	UPDATE_ARTICLE_DETAIL
} = Article.actions

export default Article.reducer