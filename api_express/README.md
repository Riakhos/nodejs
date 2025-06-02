# API Express

Cette API Express permet de gérer des utilisateurs et des messages avec une base de données MongoDB. Elle inclut l'authentification via JWT, la gestion des messages, et une interface HTML simple pour interagir avec l'API.

## Fonctionnalités

- Création, lecture, mise à jour et suppression d'utilisateurs
- Authentification sécurisée (JWT)
- Création, lecture, modification et suppression de messages
- Recherche de messages par utilisateur ou par identifiant
- Interface HTML pour tester toutes les fonctionnalités (users.html, messages.html)
- Connexion à MongoDB (local ou Atlas)
- Sécurité des mots de passe (attention : version de démonstration sans hashage)

## Installation

1. Clonez le dépôt et placez-vous dans le dossier `api_express` :
   ```bash
   cd api_express
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez le fichier `.env` (voir exemple fourni).

4. Lancez le serveur :
   ```bash
   npm start
   ```

L'API sera accessible sur [http://localhost:8000](http://localhost:8000).

## Variables d'environnement

- `PORT` : Port d'écoute du serveur (ex : 8000)
- `MONGO_URI` : URI de connexion à MongoDB Atlas
- `DB_NAME` : Nom de la base de données
- `JWT_SECRET` : Clé secrète pour les tokens JWT

## Endpoints principaux

### Utilisateurs

- `POST /api/user/add` : Inscription d'un utilisateur
- `POST /api/user/login` : Connexion d'un utilisateur (retourne un token JWT)
- `GET /api/user/all` : Liste de tous les utilisateurs
- `GET /api/user/find/:id` : Recherche d'un utilisateur par ID
- `PUT /api/user/update/:id` : Mise à jour d'un utilisateur (authentifié)
- `DELETE /api/user/delete/:id` : Suppression d'un utilisateur (authentifié)

### Messages

- `POST /api/message/add` : Ajouter un message (authentifié)
- `GET /api/message/all` : Liste paginée de tous les messages
- `GET /api/message/find/:idMessage` : Recherche d'un message par ID
- `GET /api/message/all/message/:idUser` : Tous les messages d'un utilisateur
- `PUT /api/message/update/:idMessage` : Modifier un message (authentifié, auteur uniquement)
- `DELETE /api/message/delete/:idMessage` : Supprimer un message (authentifié, auteur uniquement)

## Interface HTML

- `users.html` : Gestion et affichage des utilisateurs (inscription, connexion, recherche, modification, suppression)
- `messages.html` : Gestion et affichage des messages (ajout, modification, suppression, recherche par utilisateur ou par ID)

## Auteur

Richard Bonnegent