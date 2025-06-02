import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
import { createError } from './error.middleware.js'

export const verifieToken = (req, res, next) => {
  // Récupère le jeton (token) JWT à partir des cookies de la requête
  const token = req.cookies.access_token;

  // Si le jeton (token) n'est pas présent, 
  // renvoie une erreur 401 (accès refusé)
  if(!token) return next(createError(401, "Acces Denied"))

  // Vérifier la validité du jeton en utilisant jwt.verify
  jwt.verify(token, env.TOKEN, (error, user) => {
    console.log("JWT Secret Key:", env.TOKEN);

    // si une erreur se produit lors de la vérification du jeton
    if(error) {

      // Renvoie une erreur 403 (interdit) 
			// car le jeton (token) n'est pas valide
      return next(createError(403, "Token non valide !"))
    }

    // si la vérification réussit, 
		// ajoute les information de l'utilisateur
		// dans l'objet req
    req.user = user

    next();
    
  })
};