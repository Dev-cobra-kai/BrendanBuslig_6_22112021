const sauce = require('../models/sauce');
const fs = require('fs');

// Retourne toutes les sauces
exports.getAllSauces = (req, res, next) => {
    sauce.find()
        .then((sauces) => { res.status(200).json(sauces) })
        .catch((error) => { res.status(400).json({ error: error }) });
};

// Retourne la sauce avec l'_id fourni
exports.getOneSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
        .then((sauce) => { res.status(200).json(sauce) })
        .catch((error) => { res.status(404).json({ error: error }) });
};

// Crée une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const newSauce = new sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    newSauce.save()
        .then(() => res.status(201).json({ message: 'Nouvelle Sauce créée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modifie sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Supprime sauce
exports.deleteSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

