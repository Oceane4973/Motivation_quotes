# Motivation_quotes

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
