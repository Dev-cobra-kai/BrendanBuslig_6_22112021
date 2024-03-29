// Middleware : Exécute des fonctions lors de la requête au serveur

// Importer JsonWebToken
const jwt = require('jsonwebtoken');
// require('dotenv').config();

// Utilisateur authentifié = routes sécurisées
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Empêche d’usurper l’identité de l’utilisateur
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        // if (req.body.userId && req.body.userId !== userId) {
        //     throw 'User ID non valable';
        // } else {
            next();
        // }
    } catch {
        res.status(401).json({
            error: new Error('Requête non authentifiée!')
        });
    }
};
