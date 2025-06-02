/**
 * Vérifie si l'utilisateur a les permissions nécessaires pour accéder ou modifier un document.
 * 
 * @param {Object} document - Le document récupéré depuis la base de données.
 * @param {string} userId - L'ID de l'utilisateur connecté.
 * @param {string} userRole - Le rôle de l'utilisateur connecté (ex : 'user', 'admin').
 * @param {Array<string>} rolesAllowed - Liste des rôles autorisés à accéder/modifier le document.
 * 
 * @returns {boolean} - Retourne `true` si l'utilisateur est autorisé, sinon `false`.
 */
export const checkPermission = (document, userId, userRole, rolesAllowed = []) => {

	// Vérifie si l'utilisateur connecté est le créateur du document
	if (document.user.toString() !== userId && !rolesAllowed.includes(userRole)) {
	  return false; //* L'utilisateur n'est pas autorisé
	}
	
	return true; //* L'utilisateur est autorisé
};  