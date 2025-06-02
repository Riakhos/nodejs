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
                ? '../../../assets/img/close.png'
                : '../../../assets/img/burger.png';
        });

        // Ferme le menu si on repasse en mode desktop lors d'un redimensionnement
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) {
                navUl.classList.remove('open'); // Retire la classe 'open'
                burger.src = '../../../assets/img/burger.png'; // Remet l'icône burger
            }
        }); 
    } else {
        // Affiche une erreur si les éléments ne sont pas trouvés
        console.error("L'élément burger ou nav n'a pas été trouvé");
    }
    
    // MENU BURGER pour la sous-navbar (API Express)
    document.addEventListener("DOMContentLoaded", () => {
        const subBurger = document.getElementById('sub-burger-menu');
        const subNavUl = document.querySelector('.sub-nav ul');
    
        if (subBurger && subNavUl) {
            subBurger.addEventListener('click', () => {
                subNavUl.classList.toggle('open');
                subBurger.src = subNavUl.classList.contains('open')
                    ? '../../../assets/img/close.png'
                    : '../../../assets/img/burger.png';
            });
    
            window.addEventListener('resize', () => {
                if (window.innerWidth > 700) {
                    subNavUl.classList.remove('open');
                    subBurger.src = '../../../assets/img/burger.png';
                }
            });
        }
    });

// ===========================
// MODALE NODEJS : OUVERTURE ET FERMETURE
// ===========================

    // Gestion de la modale pour les liens .open-modal
    document.querySelectorAll('.open-modal').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            fetch(this.dataset.md)
                .then(res => res.text())
                .then(md => {
                    document.getElementById('modal-body').innerHTML = marked.parse(md);
                    document.getElementById('modal-nodejs').classList.add('show'); // Affiche la modale
                });
        });
    });

    // Fermeture de la modale au clic sur la croix
    document.querySelector('.close-modal').onclick = function() {
        document.getElementById('modal-nodejs').classList.remove('show');
    };

    // Fermeture de la modale si on clique en dehors du contenu
    document.getElementById('modal-nodejs').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
});

// Affichage des utilisateurs au chargement
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:8000/api/user/all')
        .then(res => res.json())
        .then(users => {
            const ul = document.getElementById('users-list');
            ul.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.username || user.email || JSON.stringify(user);
                ul.appendChild(li);
            });
        });

    // Gestion des modales inscription/connexion
    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            let html = '';
            if (this.dataset.modal === 'signup') {
                html = `
                    <h2>Inscription</h2>
                    <form id="signup-form">
                        <input type="text" name="username" placeholder="Nom d'utilisateur" required><br>
                        <input type="password" name="password" placeholder="Mot de passe" required><br>
                        <button type="submit" class="btn">S'inscrire</button>
                    </form>
                    <div id="signup-result"></div>
                `;
            } else if (this.dataset.modal === 'signin') {
                html = `
                    <h2>Connexion</h2>
                    <form id="signin-form">
                        <input type="text" name="username" placeholder="Nom d'utilisateur" required><br>
                        <input type="password" name="password" placeholder="Mot de passe" required><br>
                        <button type="submit" class="btn">Se connecter</button>
                    </form>
                    <div id="signin-result"></div>
                `;
            }
            document.getElementById('modal-body').innerHTML = html;
            document.getElementById('modal-nodejs').classList.add('show');

            // Gestion soumission inscription
            const signupForm = document.getElementById('signup-form');
            if (signupForm) {
                signupForm.onsubmit = function(e) {
                    e.preventDefault();
                    fetch('/api/user/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: this.username.value,
                            password: this.password.value
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('signup-result').textContent = data.message || JSON.stringify(data);
                    });
                };
            }
            // Gestion soumission connexion
            const signinForm = document.getElementById('signin-form');
            if (signinForm) {
                signinForm.onsubmit = function(e) {
                    e.preventDefault();
                    fetch('/api/user//update/:idUser', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: this.username.value,
                            password: this.password.value
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('signin-result').textContent = data.message || JSON.stringify(data);
                    });
                };
            }
        });
    });

    // Fermeture de la modale
    document.querySelector('.close-modal').onclick = function() {
        document.getElementById('modal-nodejs').classList.remove('show');
    };
    document.getElementById('modal-nodejs').addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('show');
    });
});