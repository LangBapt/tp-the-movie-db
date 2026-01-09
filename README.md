# Netflux - Application de gestion de films

Netflux est une application React qui permet de naviguer, rechercher et gérer vos films préférés. Elle utilise l'API **TheMovieDB** pour récupérer les informations sur les films et propose une interface moderne inspirée de Netflix.

---

## Fonctionnalités

1. **Liste des films**
   - Affiche les films populaires, en salle, les mieux notés et à venir.
   - Barre de recherche avec **debounce** pour éviter les appels API trop fréquents.
   - Pagination avec 20 films par page et boutons "Précédent" / "Suivant".

2. **Détails d’un film**
   - Affiche les informations complètes d’un film : synopsis, date de sortie (format `JJ/MM/AAAA`), note moyenne.
   - Liste des **acteurs principaux** (5 par ligne) avec leur photo.
   - Liste des **films similaires** (5 par ligne).
   - **Bande-annonce officielle** intégrée directement sous la note avec un bouton pour afficher/masquer le trailer.
   - Ajout ou suppression du film à la **wishlist**.

3. **Wishlist**
   - Gestion d’une liste personnelle de films favoris.
   - Affichage similaire à la liste de films avec recherche intégrée (debounce).
   - Possibilité de retirer un film de la wishlist.
   - Persistance dans le **localStorage** pour conserver les films entre les sessions.

4. **Responsive Design**
   - L’application est entièrement responsive pour ordinateurs, tablettes et smartphones.
   - Les grilles de films et d’acteurs s’adaptent selon la largeur de l’écran.

5. **Navigation**
   - Navbar avec liens vers la liste des films (`/`) et la wishlist (`/wishlist`), affichage du nombre de films dans la wishlist.
   - Routes :
     - `/` : Liste des films
     - `/movie/:id` : Détails d’un film
     - `/wishlist` : Wishlist

---

## Prérequis

- Node.js >= 18
- npm ou yarn
- Une clé API valide **TheMovieDB** ([https://www.themoviedb.org/](https://www.themoviedb.org/))

---

## Installation

1. Cloner le projet :

```bash
git clone https://github.com/LangBapt/tp-the-movie-db.git
cd tp-the-movie-db
Installer les dépendances :

bash
Copier le code
npm install
# ou
yarn
Créer un fichier .env à la racine du projet avec le contenu suivant :

env
Copier le code
VITE_TMDB_API_KEY=VOTRE_CLE_API
Remplacez VOTRE_CLE_API par votre clé personnelle TheMovieDB.

Lancement
Pour démarrer l’application en mode développement :

bash
Copier le code
npm run dev
# ou
yarn dev
Ouvrir ensuite http://localhost:5173 dans votre navigateur.