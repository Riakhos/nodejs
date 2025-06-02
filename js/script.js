// ===========================
// MENU BURGER JQUERY : OUVERTURE ET FERMETURE
// ===========================


// Attendre que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => {
    // Sélection du bouton burger et de la liste de navigation principale
    const burger = document.getElementById('burger-menu');
    const navUl = document.querySelector('.main-nav ul');

    // Vérifie que les éléments existent avant d'ajouter les événements
    if (burger && navUl) {
        // Au clic sur le burger, ouvrir/fermer le menu
        burger.addEventListener('click', () => {
            navUl.classList.toggle('open'); // Ajoute ou retire la classe 'open' sur le menu
            // Change l'icône du burger selon l'état du menu
            burger.src = navUl.classList.contains('open')
                ? 'assets/img/close.png'
                : 'assets/img/burger.png';
        });

        // Ferme le menu si on repasse en mode desktop lors d'un redimensionnement
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) {
                navUl.classList.remove('open'); // Retire la classe 'open'
                burger.src = 'assets/img/burger.png'; // Remet l'icône burger
            }
        }); 
    } else {
        // Affiche une erreur si les éléments ne sont pas trouvés
        console.error("L'élément burger ou nav n'a pas été trouvé");
    }
});