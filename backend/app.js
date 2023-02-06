// Importer Express
const express = require('express');

// Importer body-parser
const bodyParser = require('body-parser');

// Importer mongoose
const mongoose = require('mongoose');

// Importer la route des sauces
const sauceRoutes = require('./routes/sauce');

// Importer la route des users
const userRoutes = require('./routes/user');

// Importer les chemins de fichiers et de répertoires
const path = require('path');

// Créer une application Express
const app = express();

// Importer les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

// Connexion à MongoDB Atlas
mongoose.connect('mongodb+srv://piiquante:123@cluster0.zksbf.mongodb.net/Piiquante?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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

