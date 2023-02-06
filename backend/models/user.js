// Importer mongoose
const mongoose = require('mongoose');
// Importer mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

// Pour enregistrer un nouvel utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Pour enregistrer seulement une fois la même adresse mail dans la BDD
userSchema.plugin(uniqueValidator);

// Exporter le module
module.exports = mongoose.model('User', userSchema);

