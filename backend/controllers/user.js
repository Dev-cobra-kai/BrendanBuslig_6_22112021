// Importer Bcrypt pour hasher le password
const bcrypt = require('bcrypt');
// Importer JsonWebToken
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
// Importer user du dossier models
const User = require('../models/user');

// Enregistrer un nouvel utilisateur dans la BDD
exports.signup = (req, res, next) => {
     // Hasher le password avant de l'envoyer dans la BDD
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Eléments enregistrés dans MongoDB
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Connecter un utilisateur dans la BDD
exports.login = (req, res, next) => {
    // Rechercher si le mail est présent dans la BDD
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) { return res.status(401).json({ error: 'Utilisateur non trouvé !' }); }
            // Controler validité du password
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Si le password est incorrect
                    if (!valid) { return res.status(401).json({ error: 'Mot de passe incorrect !' }); }
                    // Password correct
                    res.status(200).json({ //({ message: 'Utilisateur trouvé !' })
                        // Encodage du userId
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};