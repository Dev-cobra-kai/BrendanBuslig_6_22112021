// Le fichier app. js contient le code JavaScript permettant de démarrer un serveur et de répondre aux requêtes

// Importer Express (un framework pour construire des applications web basées sur Node.js)
const express = require('express');

// Importer body-parser (Ce module permet d'interpréter, d'où le nom “parser”, le corps JSON d'une réponse HTTP)
const bodyParser = require('body-parser');

// Importer mongoose (Bibliothèque de programmation orientée objet JavaScript qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js)
const mongoose = require('mongoose');

// Importer la route des sauces
const sauceRoutes = require('./routes/sauce');

// Importer la route des users
const userRoutes = require('./routes/user');

// Importer les chemins de fichiers et de répertoires
const path = require('path');

// Importer helmet (Permet de sécuriser vos applications Express en définissant divers en-têtes http)
const helmet = require('helmet');

// Créer une application Express
const app = express();

//Importer des variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config()
if (result.error) {
  throw result.error
}
console.log(result.parsed)

// Connexion à MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.BDD_USERNAME}:${process.env.BDD_PASSWORD}@cluster0.zksbf.mongodb.net/${process.env.BDD_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Ajoute helmet pour protéger les routes
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Gérer les problèmes de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Transformer le body en JSON
app.use(bodyParser.json());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exporter app.js pour pouvoir y accèder depuis un autre fichier
module.exports = app;

