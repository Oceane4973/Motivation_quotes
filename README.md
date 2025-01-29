# Motivation_quotes

## Service de citations motivantes

Le service de citations utilise l'API ZenQuotes pour récupérer des citations inspirantes et les compare avec l'entrée de l'utilisateur pour trouver la citation la plus pertinente.

### Fonctionnement

1. **Récupération des citations**
   - Utilisation de l'API ZenQuotes (`https://zenquotes.io/api/quotes`)
   - Les citations sont récupérées via un service API dédié

2. **Traitement des similarités**
   - Utilisation du modèle `all-MiniLM-L6-v2` pour générer des embeddings
   - Calcul de la similarité cosinus entre l'entrée utilisateur et chaque citation
   - Sélection de la citation ayant le meilleur score de similarité

3. **Gestion des cas d'erreur**
   - En cas d'échec de l'API ou du calcul de similarité, une citation aléatoire est renvoyée
   - Un score de similarité est toujours calculé, même pour les citations aléatoires

### Routes API

- **GET** `/quotes`
  - *Paramètres*
    - `input` : Le texte de l'utilisateur pour trouver une citation similaire
  - *Réponse*
    - **200** : Un JSON contenant :
      - `userInput` : Le texte original de l'utilisateur
      - `bestQuote` ou `randomQuote` : La citation sélectionnée avec ses détails
      - `bestScore` ou `score` : Le score de similarité calculé
  - *Erreur*
    - **500** : En cas d'erreur serveur ou d'indisponibilité de l'API externe

### Technologies utilisées

- **NLP** : Modèle `all-MiniLM-L6-v2` via `@xenova/transformers`
- **Calcul de similarité** : Algorithme de similarité cosinus
- **API externe** : ZenQuotes.io pour la source des citations
## Service de traduction

Le service de traduction intégré à l'application permet de traduire des phrases dans 6 langues différentes :
- Français : 'fr'
- Anglais : 'en'
- Allemand : 'de'
- Espagnol : 'es'
- Italien : 'it'
- Japonais : 'ja'

Ce service propose les routes suivantes :
- **GET** `translate`
  - *Paramètres*
    - `message` : Le message à traduire
    - `language` : La langue dans laquelle traduire le message
  - *Réponse*
    - **200** : Un JSON avec les différents éléments renvoyés
    - `original_message` : Le message original à traduire
    - `original_language` : La langue du message original
    - `translated` : Le message traduit
    - `language` : La langue qui a traduit le message
  - *Erreur*
    - **400** : Si un des paramètres est absent (`message` ou `language`)
- **GET** `translate/languages`
  - *Réponse*
    - **200** : Un JSON avec les 6 langues disponibles dans la traduction

## Configuration Docker

Pour démarrer les conteneurs Docker associés à ce projet, suivre ces étapes :
- Se positionner dans le dossier racine
- Démarrer les conteneurs avec la commande `docker compose up -d --build`
- Vérifier que les conteneurs sont fonctionnels
  - Lister les conteneurs avec la commande `docker ps`
  - Se rendre sur `http://localhost` et vérifier que la page d'accueil s'affiche

> **Volumes**
> 
> Des volumes ont été mis en place, ces volumes permettent de développer depuis votre IDE et de reporter vos modifications directement sur les conteneurs.

## Tests

Des tests unitaires ont été ajoutés au projet, pour les lancer : `docker exec motivation-quotes-backend npm run test`


