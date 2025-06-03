# Projets Node.js – Présentation et Utilisation

Bienvenue sur le dépôt des projets Node.js de Richard Bonnegent.  
Ce dépôt regroupe plusieurs exemples complets pour apprendre et pratiquer le développement backend et frontend avec Node.js, Express, MongoDB et React.

---

## Introduction à Node.js

Node.js est une plateforme d'exécution JavaScript côté serveur, idéale pour créer des applications web rapides, évolutives et modernes.  
Pour débuter avec Node.js et Visual Studio Code, suivez ces étapes :

1. **Installer Node.js**  
Téléchargez la version LTS sur [nodejs.org](https://nodejs.org/), installez-la puis vérifiez l’installation dans le terminal :
  ```bash
  node -v
  npm -v
  ```

2. Installer Visual Studio Code
  Téléchargez-le sur [code.visualstudio.com](https://code.visualstudio.com/) et installez-le.

3. Créer ou ouvrir un projet Node.js dans VS Code  
Ouvrez un dossier de projet.
Créez un fichier `app.js` et testez avec :
  ```javascript
  console.log("Bonjour, Node.js est bien configuré dans VS Code !");
  ```
Exécutez-le dans le terminal :
  ```bash
  node app.js
  ```

## Structure des projets

- **api_express**  
  API REST sécurisée avec Express, MongoDB et JWT.  
  Permet la gestion complète des utilisateurs et des messages, avec authentification, pagination, recherche, et interface HTML de test.

- **front_react**  
  Frontend React moderne qui consomme l’API Express ou La Foire REST API.  
  Affichage dynamique, design responsive, formulaires connectés à l’API, gestion des états, etc.

- **la_foire_rest_api**  
  API complète pour la gestion d’articles, d’avis et d’utilisateurs.  
  Authentification avancée, architecture modulaire, endpoints robustes.

## Lancer les projets

1. Cloner le dépôt
Commande
  ```bash
  git clone <url-du-repo>
  cd <nom-du-repo>
  ```

2. Installer les dépendances
Pour chaque dossier de projet (exemple pour `api_express`) :
  ```bash
  cd api_express
  npm install
  ```

Fais de même pour `front_react` et `la_foire_rest_api`.

3. Configurer les variables d’environnement
Crée un fichier `.env` dans chaque projet backend (voir les exemples `.env.example` fournis).

4. Lancer les serveurs

**API Express** :
  ```bash
  # Dans le dossier api_express
  cd api_express
  npm start
  ```

**La Foire REST API** :
  ```bash
  # Dans le dossier la_foire_rest_api
  cd la_foire_rest_api
  npm start
  ```

**Front React** :
  ```bash
  # Dans le dossier front_react
  cd front_react
  npm run build
  # ou pour développement :
  npm start
  ```

5. Accéder aux applications
- API Express : [http://localhost:8001](http://localhost:8001) (ou le port défini)
- Front React : [http://localhost:3000](http://localhost:3000) (ou le port défini)
- La Foire REST API : [http://localhost:8002](http://localhost:8002) (ou le port défini)

## Utilisation

- **API Express**  
  Voir la documentation dans `README.md` pour les endpoints, l’authentification, etc.

- **Front React**  
  Voir `README.md` et `OPTIMISER.md` pour l’utilisation, les optimisations et la structure du front.

- **La Foire REST API**  
  Voir `README.md` pour la liste des routes, la gestion des utilisateurs, articles, avis, etc.

## Ressources complémentaires
- **introduction_nodejs.md** – Introduction à Node.js et installation sur VS Code
- **utilisation_nodejs.md** – Guide d’utilisation de Node.js dans VS Code

## Conclusion
Ce dépôt vous permet de découvrir et pratiquer le développement Node.js, Express, MongoDB et React, du backend à l’interface utilisateur.
N’hésitez pas à consulter les README de chaque projet pour plus de détails et à explorer le code pour progresser !