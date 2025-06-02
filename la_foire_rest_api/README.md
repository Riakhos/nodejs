# 📦 Projet la_foire_rest_api Node.js avec Express et MongoDB

Ce projet est une application web développée avec **Node.js**, **Express**, et **MongoDB**.
Elle permet de gérer des **utilisateurs**, des **articles**, et des **avis** associés avec des fonctionnalités comme l'authentification, la gestion des rôles, et la sécurisation des mots de passe.

## 🛠️ Fonctionnalités

### Gestion des Articles

- **CRUD complet** : création, lecture, mise à jour et suppression d'articles.
- Gestion des **images** pour les articles.
- **Tri des articles** par prix ou par note.
- Association avec des **avis** (commentaires et notes).

### Gestion des Avis

- Ajout, modification et suppression d'avis sur des articles.
- Les avis incluent une note (rating) et un commentaire (comment).
- Association avec des utilisateurs et des articles.

### Gestion des Utilisateurs

- **Authentification** : inscription et connexion avec des mots de passe sécurisés.
- Rôles utilisateurs : `user` et `admin`.
- Gestion du profil utilisateur, y compris l'avatar.

### Sécurité

- **Hachage des mots de passe** avec bcrypt.
- **Validation des tokens JWT** pour protéger les routes sensibles.
- Vérification des **permissions** pour sécuriser l'accès aux ressources.

### Performances et Modularité

- Support de la **pagination** et de la **population** (relations MongoDB).
- Gestion centralisée des réponses HTTP.
- Validation des IDs MongoDB.

## 🚀 Installation

### 1. Pré-requis

Assurez-vous d'avoir installé les outils suivants :

- **Node.js** (version 14 ou supérieure)
- **MongoDB** (local ou Atlas pour une base de données hébergée)

### 2. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/nom_de_votre_base_de_donnees
JWT_SECRET=un_secret_pour_generer_les_tokens
NODE_ENV=development
```

### 5. Démarrer le serveur

```bash
npm start
```

Le serveur sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

## 📂 Structure du Projet

```bash
la_foire_rest_api
|
|__ config/                        # Configuration des variables d'environnement
│   ├── index.js         
├── controllers/                   # Contient les contrôleurs pour chaque ressource
│   ├── article.controller.js      # Controller des articles
│   ├── avis.controller.js         # Controller des avis
│   ├── user.controller.js         # Controller des utilisateurs
├── middlewares/
│   ├── auth.middleware.js         # Authentification JWT
│   ├── error.middleware.js        # Gestion des erreurs
├── models/
│   ├── article.model.js           # Modèle des articles
│   ├── avis.model.js              # Modèle des avis
│   ├── user.model.js              # Modèle des utilisateurs
├── routes/
│   ├── article.router.js          # Routes pour les articles
│   ├── avis.router.js             # Routes pour les avis
│   ├── user.router.js             # Routes pour les utilisateurs
├── utils/
│   ├── send_response.js           # Gestion des réponses HTTP
│   ├── validateObjectId.js        # Validation des IDs MongoDB
│   ├── password.util.js           # Hachage et comparaison de mots de passe
│   ├── permission.js              # Vérification des permissions
├── controllers/
│   ├── common.controller.js       # Fonctions génériques pour le CRUD
├── server.js                      # Démarrage du serveur
└── .env                           # Variables d'environnement
```

## 🧪 API Endpoints

### **Utilisateurs**

| Méthode | Endpoint                  | Description                                       | Accès        |
|---------|---------------------------|---------------------------------------------------|--------------|
| POST    | `/api/user/signup`        | Inscription d'un utilisateur                      | Public       |
| POST    | `/api/user/sign`          | Connexion d'un utilisateur                        | Public       |
| GET     | `/api/user/get`           | Récupérer tous les utilisateurs                   | Public       |
| GET     | `/api/user/get/:id`       | Récupérer un utilisateur  par ID                  | Authentifié  |
| PUT     | `/api/user/update/:id`    | Modifier un utilisateur                           | Authentifié  |
| DELETE  | `/api/user/delete/:id`    | Supprimer un utilisateur                          | Authentifié  |
| PUT     | `/api/user/reactivate/:id`| Réactiver un utilisateur                          | Authentifié  |

### **Articles**

| Méthode | Endpoint                  | Description                                       | Accès        |
|---------|---------------------------|---------------------------------------------------|--------------|
| GET     | `/api/article/all`        | Récupérer tous les articles                       | Public       |
| POST    | `/api/article/add`        | Créer un nouvel article                           | Authentifié  |
| GET     | `/api/article/get/:id`    | Récupérer un article par ID                       | Public       |
| PUT     | `/api/article/update/:id` | Modifier un article                               | Authentifié  |
| DELETE  | `/api/article/delete/:id` | Supprimer un article                              | Authentifié  |
| GET     | `/api/article/asc`        | Récupérer tous les articles en ordre croissant    | Public       |
| GET     | `/api/article/desc`       | Récupérer tous les articles en ordre décroissant  | Public       |
| GET     | `/api/article/avis/:id`   | Récupérer tous les avis d'un article              | Public       |
| GET     | `/api/article/note`       | Récupérer tous les articles triés par note        | Public       |

### **Avis**

| Méthode | Endpoint                   | Description                                      | Accès        |
|---------|----------------------------|--------------------------------------------------|--------------|
| GET     | `/api/avis//all`           | Récupérer tous les avis                          | Public       |
| POST    | `/api/avis/add/:articleId` | Ajouter un avis                                  | Authentifié  |
| GET     | `/api/avis/get/:avisId`    | Récupérer un avis par ID                         | Public       |
| PUT     | `/api/avis/update/:avisId` | Modifier un avis                                 | Authentifié  |
| DELETE  | `/api/avis/delete/:avisId` | Supprimer un avis                                | Authentifié  |

## 📚 Technologies Utilisées

- **Node.js** : pour la gestion du serveur.
- **Express** : pour la gestion des routes et des middlewares.
- **MongoDB & Mongoose** : pour la base de données.
- **bcrypt** : pour sécuriser les mots de passe.
- **jsonwebtoken (JWT)** : pour l'authentification.
- **dotenv** : pour gérer les variables d'environnement.

## 👥 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez ce projet.
2. Créez une branche pour votre fonctionnalité (`git checkout -b nouvelle-fonctionnalite`).
3. Faites vos modifications et commitez-les (`git commit -m "Ajout de la fonctionnalité X"`).
4. Poussez la branche (`git push origin nouvelle-fonctionnalite`).
5. Ouvrez une Pull Request.

## 🛡️ Licence

Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT). Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter à : [richard.bonnegent@gmail.com](mailto:richard.bonnegent@gmail.com)

Ce fichier `README.md` couvre toutes les bases du projet, y compris son installation, sa structure, ses fonctionnalités, et ses endpoints. Si vous souhaitez ajouter ou modifier des sections spécifiques, faites-le-moi savoir ! 😊
