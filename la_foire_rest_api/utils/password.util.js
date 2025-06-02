import bcrypt from "bcrypt";

/**
 * Hash un mot de passe donné.
 * @param {String} password - Le mot de passe en texte brut.
 * @returns {Promise<String>} - Le mot de passe hashé.
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);   //* Génère un salt
  return bcrypt.hash(password, salt);      //* Retourne le mot de passe hashé
};

/**
 * Compare un mot de passe en clair avec un hash.
 * @param {String} candidatePassword - Le mot de passe en clair.
 * @param {String} hashedPassword - Le mot de passe hashé.
 * @returns {Promise<Boolean>} - Résultat de la comparaison.
 */
export const comparePassword = async (candidatePassword, hashedPassword) => {
  return bcrypt.compare(candidatePassword, hashedPassword); //* Compare et retourne un booléen
};
