# Amélioration des fonctionnalités

Ce document contient une liste des améliorations et tâches à réaliser pour améliorer les fonctionnalités de notre application. Les tâches sont réparties en différentes sections.

## 1. **Home.jsx**

### Bouton Acheter Home

- Ajouter un bouton **"Acheter"** dans la page d'accueil.
- Implémenter la fonctionnalité de redirection vers la page de paiement ou le panier lorsqu'on clique sur le bouton.

### Ajouter au panier Home

- Implémenter une fonctionnalité pour ajouter un produit au panier.
- Utiliser **Redux** pour gérer l'état du panier de manière globale.
- Afficher une notification ou un message de confirmation lorsque l'article est ajouté au panier.

## 2. **Details.jsx**

### Bouton Acheter Details

- Ajouter un bouton **"Acheter"** dans la page de détails de l'article.
- Implémenter la redirection vers le panier ou la page de paiement.

### Ajouter au panier Details

- Ajouter un bouton **"Ajouter au panier"** sur la page de détails.
- Lorsqu'un utilisateur ajoute un article au panier, mettre à jour l'état global du panier (via Redux).

## 3. **Dashboard**

### Article

#### Afficher article

- Implémenter une fonctionnalité pour afficher les articles dans le dashboard.
- Lister les articles avec leurs informations (nom, prix, etc.).

#### Ajouter article

- Créer un formulaire pour ajouter un nouvel article via le dashboard.
- Utiliser Axios pour envoyer les données du formulaire au serveur.

#### Supprimer article

- Ajouter une fonctionnalité pour supprimer un article via un bouton de suppression.

#### Modifier article

- Ajouter une fonctionnalité pour modifier un article existant.
- S'assurer que les données de l'article sont pré-remplies dans le formulaire de modification.
  - **Problème à résoudre** : Vérifier pourquoi les données ne sont pas déjà remplies dans le formulaire.

### Utilisateur

#### Afficher utilisateur

- Implémenter une vue des utilisateurs dans le dashboard.
- Lister les utilisateurs avec leurs informations de base.

#### Ajouter utilisateur

- Créer un formulaire pour ajouter un nouvel utilisateur.

#### Supprimer utilisateur

- Ajouter un bouton pour supprimer un utilisateur.

#### Modifier utilisateur

- Ajouter une fonctionnalité pour modifier un utilisateur existant.

#### Historique commande utilisateur

- Implémenter une vue de l'historique des commandes pour chaque utilisateur.

### Avis

#### Afficher avis

- Implémenter une vue pour afficher les avis des utilisateurs sur les produits.

#### Ajouter avis

- Créer un formulaire pour ajouter un avis sur un produit.

#### Supprimer avis

- Ajouter un bouton pour supprimer un avis.

#### Modifier avis

- Ajouter une fonctionnalité pour modifier un avis existant.

#### Historique avis

- Implémenter un historique des avis dans le dashboard.

## 4. **Page Search**

### Afficher les données de l'article

- Afficher une liste d'articles avec leurs informations de base (nom, prix, etc.).

### Plus de détails

- Ajouter un lien ou un bouton pour afficher plus de détails sur chaque article.
- Rediriger vers la page de détails de l'article.

### Possibilité de commander directement

- Ajouter une fonctionnalité pour commander directement un article depuis la page de recherche.
- Ajouter un bouton **"Commander"** qui redirige vers la page de commande.

## 5. **Contact**

### Créer la page de contact

- Créer une page **Contact** qui inclut un formulaire de contact.
- Implémenter la logique pour envoyer les messages via un backend ou un service externe (comme un service d'email).

## 6. **A propos**

### Créer la page à propos

- Créer une page **À propos** qui présente des informations sur l'entreprise ou le site.
- Inclure des détails sur la mission, l'historique ou l'équipe.

## 7. **Utilisation de Redux**

### Voir où c'est utilisé

- Identifier où Redux est déjà utilisé dans l'application.
- Examiner les fonctionnalités qui dépendent de l'état global.

### Ajouter si nécessaire

- Ajouter Redux pour gérer l'état global là où cela est nécessaire (par exemple, pour le panier, les utilisateurs, etc.).

## 8. **Remplacer Fetch par Axios**

### Objectif

- Remplacer toutes les instances de `fetch()` par `axios` pour les requêtes HTTP.
- Assurer une gestion des erreurs plus robuste et un code plus facile à maintenir.

### Étapes

- Identifier toutes les requêtes `fetch()` dans l'application.
- Remplacer chaque requête par une version utilisant `axios`.
- Tester chaque fonctionnalité pour s'assurer que les requêtes fonctionnent correctement après la modification.

## 9. **Créer un Panier**

### Objectif du panier

- Créer un système de panier pour les utilisateurs, permettant d'ajouter, modifier, ou supprimer des articles dans le panier.

### Étapes du panier

- Utiliser **Redux** pour gérer l'état du panier (ajout, suppression, mise à jour de la quantité d'articles).
- Créer des actions et des reducers pour gérer les différentes actions liées au panier.
- Créer une page de panier où les utilisateurs peuvent visualiser, modifier ou supprimer les articles.
- Ajouter la possibilité de passer à la page de paiement à partir du panier.

## Conclusion

Ces améliorations permettront de rendre l'application plus fonctionnelle, ergonomique et moderne en utilisant des outils comme **React**, **Redux** et **Axios**. Chaque fonctionnalité doit être testée de manière approfondie pour assurer une expérience utilisateur fluide et sans erreur.

### Explications des sections

- **Amélioration des fonctionnalités** : Cette section décrit les tâches générales à accomplir.
- **Home.jsx, Details.jsx, Dashboard, etc.** : Chaque fonctionnalité du projet est décomposée en tâches spécifiques (ajouter des boutons, gérer des états, etc.).
- **Remplacer `fetch` par `axios`** : Cette tâche vise à améliorer la gestion des requêtes HTTP.
- **Utilisation de Redux** : Intégration de Redux dans les parties de l'application nécessitant un état global.
