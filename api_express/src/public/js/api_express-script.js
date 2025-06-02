// ===========================
// MENU BURGER JQUERY : OUVERTURE ET FERMETURE
// ===========================

document.addEventListener("DOMContentLoaded", () => {
    // Menu burger principal
    const burger = document.getElementById('burger-menu');
    const navUl = document.querySelector('.main-nav ul');
    if (burger && navUl) {
        burger.addEventListener('click', () => {
            navUl.classList.toggle('open');
            burger.src = navUl.classList.contains('open')
                ? './assets/img/close.png'
                : './assets/img/burger.png';
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) {
                navUl.classList.remove('open');
                burger.src = './assets/img/burger.png';
            }
        });
    } else {
        console.error("L'élément burger ou nav n'a pas été trouvé");
    }

    // Menu burger sous-navbar
    const subBurger = document.getElementById('sub-burger-menu');
    const subNavUl = document.querySelector('.sub-nav ul');
    if (subBurger && subNavUl) {
        subBurger.addEventListener('click', () => {
            subNavUl.classList.toggle('open');
            subBurger.src = subNavUl.classList.contains('open')
                ? './assets/img/close.png'
                : './assets/img/burger.png';
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 700) {
                subNavUl.classList.remove('open');
                subBurger.src = './assets/img/burger.png';
            }
        });
    } else {
        console.error("L'élément sub-burger ou sub-nav n'a pas été trouvé");
    }

    // ===========================
    // MODALE NODEJS : OUVERTURE ET FERMETURE
    // ===========================

    // Ouvre une modale markdown si data-md est présent
    document.querySelectorAll('.open-modal').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.dataset.md) {
                fetch(this.dataset.md)
                    .then(res => res.text())
                    .then(md => {
                        document.getElementById('modal-body').innerHTML = marked.parse(md);
                        document.getElementById('modal-nodejs').classList.add('show');
                    });
            }
        });
    });

    // Fermeture de la modale au clic sur la croix ou l'arrière-plan
    const closeModal = () => {
        document.getElementById('modal-nodejs').classList.remove('show');
    };
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.onclick = closeModal;
    const modalNodejs = document.getElementById('modal-nodejs');
    if (modalNodejs) {
        modalNodejs.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }

    // ===========================
    // AFFICHAGE DES UTILISATEURS (uniquement sur users.html)
    // ===========================
    if (document.getElementById('users-list')) {
        fetch('/api/user/all')
            .then(res => res.json())
            .then(data => {
                const users = Array.isArray(data.data) ? data.data : [];
                const ul = document.getElementById('users-list');
                if (ul) {
                    ul.innerHTML = '';
                    users.forEach(user => {
                        const date = new Date(user.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        });
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <strong>idUser :</strong> ${user._id}<br>
                            <strong>Nom :</strong> ${user.lastname}<br>
                            <strong>Prénom :</strong> ${user.firstname}<br>
                            <strong>Email :</strong> ${user.email}<br>
                            <strong>Créé le :</strong> ${date}
                        `;
                        ul.appendChild(li);
                    });
                    if (users.length === 0) {
                        ul.innerHTML = "<li>Aucun utilisateur trouvé.</li>";
                    }
                }
            });
    }

    // ===========================
    // MODALES INSCRIPTION / CONNEXION
    // ===========================

    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            let html = '';
            if (this.dataset.modal === 'signup') {
                html = `
                    <h2>Inscription</h2>
                    <form id="signup-form">
                        <input type="text" name="firstname" placeholder="Prénom" required><br>
                        <input type="text" name="lastname" placeholder="Nom" required><br>
                        <input type="text" name="email" placeholder="Votre adresse mail" required><br>
                        <input type="password" name="password" placeholder="Créer un mot de passe" required><br>
                        <button type="submit" class="btn">S'inscrire</button>
                    </form>
                    <div id="signup-result"></div>
                `;
            } else if (this.dataset.modal === 'signin') {
                html = `
                    <h2>Connexion</h2>
                    <form id="signin-form">
                        <input type="text" name="email" placeholder="Votre adresse mail" required autocomplete="email"><br>
                        <input type="password" name="password" placeholder="Votre mot de passe" required autocomplete="current-password"><br>
                        <button type="submit" class="btn">Se connecter</button>
                    </form>
                    <div id="signin-result"></div>
                `;
            }
            document.getElementById('modal-body').innerHTML = html;
            document.getElementById('modal-nodejs').classList.add('show');

            // Soumission inscription
            const signupForm = document.getElementById('signup-form');
            if (signupForm) {
                signupForm.onsubmit = function(e) {
                    e.preventDefault();
                    fetch('/api/user/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            firstname: this.firstname.value,
                            lastname: this.lastname.value,
                            email: this.email.value,
                            password: this.password.value
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('signup-result').textContent = data.message || JSON.stringify(data);
                    });
                };
            }
            // Soumission connexion
            const signinForm = document.getElementById('signin-form');
            if (signinForm) {
                signinForm.onsubmit = function(e) {
                    e.preventDefault();
                    fetch('/api/user/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: this.email.value,
                            password: this.password.value
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('signin-result').textContent = data.message || JSON.stringify(data);
                        // Stocke le token si présent
                        if (data.token) {
                            localStorage.setItem('token', data.token);
                        }
                        // Stocke l'utilisateur si présent
                        if (data.user) {
                            localStorage.setItem('user', JSON.stringify(data.user));
                            updateUserActions();
                        }
                    });
                };
            }
        });
    });

    // ===========================
    // AFFICHAGE DES ACTIONS UTILISATEUR (état connecté)
    // ===========================

    function updateUserActions() {
        const user = JSON.parse(localStorage.getItem('user'));
        const actions = document.getElementById('actions');
        const userActions = document.getElementById('user-actions');
        if (user) {
            if (actions) actions.style.display = 'none';
            if (userActions) userActions.style.display = 'flex';
        } else {
            if (actions) actions.style.display = 'flex';
            if (userActions) userActions.style.display = 'none';
        }
    }
    updateUserActions();

    // ===========================
    // DECONNEXION
    // ===========================

    document.getElementById('logout-btn')?.addEventListener('click', () => {
        localStorage.removeItem('user');
        updateUserActions();
        alert("Déconnecté !");
    });

    // ===========================
    // SUPPRESSION DU COMPTE
    // ===========================

    document.getElementById('delete-account-btn')?.addEventListener('click', async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && confirm("Voulez-vous vraiment supprimer votre compte ?")) {
            const res = await fetch(`/api/user/delete/${user._id}`, { method: 'DELETE' });
            const data = await res.json();
            alert(data.message);
            localStorage.removeItem('user');
            updateUserActions();
        }
    });

    // ===========================
    // MISE À JOUR DU COMPTE (modale pré-remplie)
    // ===========================

    document.getElementById('update-account-btn')?.addEventListener('click', () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const html = `
                <h2>Mettre à jour mon compte</h2>
                <form id="update-form">
                    <input type="text" name="firstname" placeholder="Prénom" required value="${user.firstname || ''}"><br>
                    <input type="text" name="lastname" placeholder="Nom" required value="${user.lastname || ''}"><br>
                    <input type="text" name="email" placeholder="Votre adresse mail" required value="${user.email || ''}" disabled><br>
                    <input type="password" name="password" placeholder="Nouveau mot de passe (laisser vide pour ne pas changer)"><br>
                    <button type="submit" class="btn">Mettre à jour</button>
                </form>
                <div id="update-result"></div>
            `;
            document.getElementById('modal-body').innerHTML = html;
            document.getElementById('modal-nodejs').classList.add('show');

            // Soumission du formulaire de mise à jour
            const updateForm = document.getElementById('update-form');
            if (updateForm) {
                updateForm.onsubmit = function(e) {
                    e.preventDefault();
                    const updateData = {
                        firstname: this.firstname.value,
                        lastname: this.lastname.value
                    };
                    if (this.password.value) {
                        updateData.password = this.password.value;
                    }
                    fetch(`/api/user/update/${user._id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updateData)
                    })
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('update-result').textContent = data.message || JSON.stringify(data);
                        // Met à jour localStorage si succès
                        if (data.data) {
                            user.firstname = updateData.firstname;
                            user.lastname = updateData.lastname;
                            localStorage.setItem('user', JSON.stringify(user));
                        }
                    });
                };
            }
        }
    });

    // ===========================
    // RECHERCHE UTILISATEUR PAR ID
    // ===========================

    document.getElementById('search-user-form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('search-id').value.trim();
        const resultDiv = document.getElementById('search-result');
        if (id) {
            const res = await fetch(`/api/user/find/${id}`);
            const data = await res.json();
            if (data.data) {
                resultDiv.innerHTML = `<strong>Nom :</strong> ${data.data.lastname}<br>
                                       <strong>Prénom :</strong> ${data.data.firstname}<br>
                                       <strong>Email :</strong> ${data.data.email}`;
            } else {
                resultDiv.textContent = data.message || "Utilisateur non trouvé.";
            }
        }
    });

    // ===========================
    // AFFICHAGE DES MESSAGES (uniquement sur messages.html)
    // ===========================
    if (document.getElementById('messages-list')) {
        fetch('/api/message/all?page=1&limit=10')
            .then(res => res.json())
            .then(data => {
                const messages = Array.isArray(data.data) ? data.data : [];
                const ul = document.getElementById('messages-list');
                if (ul) {
                    ul.innerHTML = '';
                    if (!messages.length) {
                        ul.innerHTML = "<li>Aucun message trouvé.</li>";
                        return;
                    }
                    messages.forEach(msg => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <strong>idMessage :</strong> ${msg._id}<br>
                            <strong>Message :</strong> ${msg.content || msg.text || ''}<br>
                            <strong>Utilisateur :</strong> ${msg.user ? (msg.user.firstname + ' ' + msg.user.lastname) : 'Anonyme'}<br>
                            <strong>idUser :</strong> ${msg.user ? msg.user._id : ''}<br>
                            <strong>Créé le :</strong> ${new Date(msg.createdAt).toLocaleString('fr-FR')}<br>
                            <div class="message-actions">
                                <button class="btn edit-message-btn" data-idmessage="${msg._id}" data-content="${encodeURIComponent(msg.content || msg.text || '')}">Modifier</button>
                                <button class="btn delete-message-btn" data-idmessage="${msg._id}">Supprimer</button>
                            </div>
                        `;
                        ul.appendChild(li);
                    });
                }
            });
    }
        
    // ===========================
    // AFFICHER TOUS LES MESSAGES D'UN UTILISATEUR (uniquement sur messages.html)
    // ===========================
    if (document.getElementById('search-user-messages-form')) {
        document.getElementById('search-user-messages-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const idUser = document.getElementById('search-user-id').value.trim();
            if (idUser) {
                const res = await fetch(`/api/message/all/message/${idUser}`);
                const data = await res.json();
                let html = `<h2>Messages de l'utilisateur</h2>`;
                if (data.data && Array.isArray(data.data) && data.data.length > 0) {
                    html += '<ul>';
                    data.data.forEach(msg => {
                        html += `<li>
                            <strong>idMessage :</strong> ${msg._id || '[Aucun idMessage]'}<br>
                            <strong>Message :</strong> ${msg.content || '[Aucun contenu]'}<br>
                            <strong>Créé le :</strong> ${msg.createdAt ? new Date(msg.createdAt).toLocaleString('fr-FR') : '[Date manquante]'}<br>
                            <div class="message-actions">
                                <button class="btn edit-message-btn" data-idmessage="${msg._id}" data-content="${encodeURIComponent(msg.content || msg.text || '')}">Modifier</button>
                                <button class="btn delete-message-btn" data-idmessage="${msg._id}">Supprimer</button>
                            </div>
                        </li>`;
                    });
                    html += '</ul>';
                } else {
                    html += `<p>${data.message || "Aucun message trouvé."}</p>`;
                }
                document.getElementById('modal-body').innerHTML = html;
                document.getElementById('modal-nodejs').classList.add('show');
            }
        });
    }

    // ===========================
    // RECHERCHE MESSAGE PAR ID (uniquement sur messages.html)
    // ===========================
    if (document.getElementById('search-message-form')) {
        document.getElementById('search-message-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const id = document.getElementById('search-message-id').value.trim();
            const resultDiv = document.getElementById('search-message-result');
            if (id) {
                const res = await fetch(`/api/message/find/${id}`);
                const data = await res.json();
                if (data.data) {
                    resultDiv.innerHTML = `
                        <strong>idMessage :</strong> ${data.data._id}<br>
                        <strong>Message :</strong> ${data.data.content || data.data.text || ''}<br>
                        <strong>Utilisateur :</strong> ${data.data.user ? (data.data.user.firstname + ' ' + data.data.user.lastname) : 'Anonyme'}<br>
                        <strong>idUser :</strong> ${data.data.user ? data.data.user._id : ''}<br>
                        <strong>Créé le :</strong> ${new Date(data.data.createdAt).toLocaleString('fr-FR')}<br>
                        <div class="message-actions">
                            <button class="btn edit-message-btn" data-idmessage="${msg._id}" data-content="${encodeURIComponent(msg.content || msg.text || '')}">Modifier</button>
                            <button class="btn delete-message-btn" data-idmessage="${msg._id}">Supprimer</button>
                        </div>
                    `;
                } else {
                    resultDiv.textContent = data.message || "Message non trouvé.";
                }
            }
        });
    }

    // ===========================
    // MODALE AJOUT MESSAGE (uniquement sur messages.html)
    // ===========================
    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.dataset.modal === 'add-message') {
                let html = `
                    <h2>Ajouter un message</h2>
                    <form id="add-message-form">
                        <input type="text" name="user" placeholder="idUser" required><br>
                        <textarea name="content" placeholder="Votre message" maxlength="500" required></textarea><br>
                        <button type="submit" class="btn">Envoyer</button>
                    </form>
                    <div id="add-message-result"></div>
                `;
                document.getElementById('modal-body').innerHTML = html;
                document.getElementById('modal-nodejs').classList.add('show');

                // Soumission du formulaire d'ajout de message
                const addForm = document.getElementById('add-message-form');
                if (addForm) {
                    addForm.onsubmit = async function(e) {
                        e.preventDefault();
                        const user = this.user.value.trim();
                        const content = this.content.value.trim();
                        const res = await fetch('/api/message/add', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ user, content })
                        });
                        const data = await res.json();
                        document.getElementById('add-message-result').textContent = data.message || JSON.stringify(data);
                        // Optionnel : rafraîchir la liste des messages après ajout
                    };
                }
            }
        });
    });

    // ===========================
    // MODALE MODIFIER MESSAGE (uniquement sur messages.html)
    // ===========================
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-message-btn')) {
            const idMessage = e.target.dataset.idmessage;
            const content = decodeURIComponent(e.target.dataset.content || '');
            let html = `
                <h2>Modifier le message</h2>
                <form id="edit-message-form">
                    <textarea name="content" maxlength="500" required>${content}</textarea><br>
                    <button type="submit" class="btn">Enregistrer</button>
                </form>
                <div id="edit-message-result"></div>
            `;
            document.getElementById('modal-body').innerHTML = html;
            document.getElementById('modal-nodejs').classList.add('show');

            // Soumission du formulaire de modification
            const editForm = document.getElementById('edit-message-form');
            if (editForm) {
                editForm.onsubmit = async function(ev) {
                    ev.preventDefault();
                    const newContent = this.content.value.trim();
                    // Nécessite que l'utilisateur soit authentifié (token JWT envoyé automatiquement si tu utilises fetch avec credentials)
                    const token = localStorage.getItem('token');
                    const res = await fetch(`/api/message/update/${idMessage}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(token && { 'Authorization': 'Bearer ' + token })
                        },
                        body: JSON.stringify({ content: newContent })
                    });
                    const data = await res.json();
                    document.getElementById('edit-message-result').textContent = data.response || data.message || JSON.stringify(data);
                    // Optionnel : rafraîchir la liste des messages après succès
                };
            }
        }
    });

    // ===========================
    // SUPPRESSION MESSAGE (uniquement sur messages.html)
    // ===========================
    document.body.addEventListener('click', async function(e) {
        if (e.target.classList.contains('delete-message-btn')) {
            const idMessage = e.target.dataset.idmessage;
            if (confirm("Voulez-vous vraiment supprimer ce message ?")) {
                const token = localStorage.getItem('token');
                const res = await fetch(`/api/message/delete/${idMessage}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { 'Authorization': 'Bearer ' + token })
                    }
                });
                const data = await res.json();
                alert(data.response || data.message || JSON.stringify(data));
                // Optionnel : rafraîchir la liste des messages après suppression
                location.reload();
            }
        }
    });
});