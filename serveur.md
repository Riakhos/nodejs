# Mettre en ligne front_react et la_foire_rest_api sur ton serveur

## 1. Déploiement du projet React `front_react`

**Build** ton projet React :
  ```bash
  cd front_react
  npm run build
  ```

Copie le contenu du dossier `build` dans un dossier public sur ton serveur, par exemple : `/var/www/front_react/build`

Configure **Apache** pour servir ce dossier :

Accès : 
  ```bash 
  https://richard.bonnegent.fr/front_react/index.html
  ```

## 2. Déploiement de la Foire REST API `la_foire_rest_api`

Si c’est une **API Node.js** :

Déploie-la sur un port libre (ex : 8002).

Ajoute un **reverse proxy Apache** :
  ```apache
  ProxyPass /la_foire_rest_api/api/ http://localhost:8002/api/
  ProxyPassReverse /la_foire_rest_api/api/ http://localhost:8002/api/
  ```

**Pour une interface web** (si tu as une page HTML), place-la dans un dossier public et ajoute :
  ```apache
  Alias /la_foire_rest_api /var/www/la_foire_rest_api/public
  <Directory /var/www/la_foire_rest_api/public>
      AllowOverride All
      Require all granted
  </Directory>
  ```

**Accès** :
  ```bash
  https://richard.bonnegent.fr/la_foire_rest_api/index.html
  ```

## 3. Mise à jour de tes liens dans `index.html`

Tes liens doivent pointer vers :
  ```html
  <a href="./front_react/index.html">Front React</a>
  <a href="./la_foire_rest_api/index.html">La Foire REST API</a>
  ```

ou, si tu gardes la structure `/public/` :
  ```html
  <li><a href="./front_react/public/index.html">Front React</a></li>
  <li><a href="./la_foire_rest_api/public/index.html">La Foire REST API</a></li>
  ```

Adapte selon le chemin réel sur ton serveur.

## 4. Résumé

- Build et copie le React dans un dossier public accessible.
- Déploie la Foire REST API (API et/ou interface) dans un dossier public ou via reverse proxy.
- Mets à jour tes liens si besoin.
- Redémarre Apache après modification.