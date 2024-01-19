# Construisez une API sécurisée pour une application d'avis gastronomiques  

Vous avez passé la dernière année en tant que développeur back-end indépendant et vous avez travaillé sur plusieurs projets de tailles et de difficultés variées.
La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones » . C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » .  
 
Piiquante : Marque de sauces piquantes  
Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.  

Contexte du projet  
Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées
secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise
souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter
leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.  

Exigences de sécurité  
● Le mot de passe de l'utilisateur doit être haché.  
● L'authentification doit être renforcée sur toutes les routes sauce requises.  
● Les adresses électroniques dans la base de données sont uniques et un
plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler
les erreurs.  
● La sécurité de la base de données MongoDB (à partir d'un service tel que
MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la
machine d'un utilisateur.  
● Un plugin Mongoose doit assurer la remontée des erreurs issues de la base
de données.  
● Les versions les plus récentes des logiciels sont utilisées avec des correctifs
de sécurité actualisés.  
● Le contenu du dossier images ne doit pas être téléchargé sur GitHub.  

# frontend
Pour lancer le serveur : `cd frontend` ensuite `$ npm run start` enfin `$ ng serve`

# backend
Pour lancer le serveur : `cd backend` ensuite `$ node server` puis apparait : Listening on port 3000 et Connexion à MongoDB réussie !

