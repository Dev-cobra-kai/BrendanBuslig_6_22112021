// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();
// Importer controllers/user.js
const userCtrl = require('../controllers/user');

// La route signup
router.post('/signup', userCtrl.signup);
// La route login
router.post('/login', userCtrl.login);

// Exporter le module
module.exports = router;
