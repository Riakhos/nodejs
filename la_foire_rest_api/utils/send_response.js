// Fonction pour uniformiser le format des réponses
export const sendResponse = (res, statusCode, message, data = null, options = {}) => {

	//? Approche avec sendResponse et inclusion des cookies
	// Gestion des cookies, si fournis
	if (options.cookie) {
		const { name, value, settings = {} } = options.cookie;

		// Validation basique pour éviter des erreurs silencieuses
		if (name && value) {
			res.cookie(name, value, {
				httpOnly: true,                                 //* Par défaut, les cookies sont marqués comme httpOnly
				secure: process.env.NODE_ENV === "production",  //* Les cookies sécurisés sont activés en production
				...settings,                                    //* Étend les options par des paramètres personnalisés
			});
		};
	};

	// Envoi de la réponse JSON
	res.status(statusCode).json({
		success: statusCode >= 200 && statusCode <300,
		message,
		data
	});
};