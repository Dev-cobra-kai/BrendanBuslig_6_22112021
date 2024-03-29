// Models : Permet de créer des schémas de données qui contiennent les champs souhaités
// pour indiquer leur type ainsi que leur caractère (obligatoire ou non)
// Pour cela, on utilise la méthode Schema mise à disposition par Mongoose

// Importer mongoose (Bibliothèque de programmation orientée objet JavaScript qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js)
const mongoose = require('mongoose');

// Importer le schéma des sauces
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, // Permet de ne pas voir le modify et delete avec un nouveau login
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false },
});

// Exporter le module
module.exports = mongoose.model('Sauce', sauceSchema);

