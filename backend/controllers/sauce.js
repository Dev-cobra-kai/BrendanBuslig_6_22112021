// Controllers : Permet de mettre tous les codes d'implémentation de routes

const Sauce = require('../models/sauce');
const fs = require('fs');

// Afficher toutes les sauces
exports.getAllSauce = (req, res, next) => {
    // Utilisation de find() pour voir toutes les sauces
    Sauce.find()
        .then((sauces) => { res.status(200).json(sauces) })
        .catch((error) => { res.status(400).json({ error }) });
};

// Afficher une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => { res.status(200).json(sauce) })
        .catch((error) => { res.status(404).json({ error }) });
};

// Créer une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,

    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Nouvelle Sauce créée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
    if (req.file) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split("/images")[1];
                // Suppression de l'image de la sauce lors de la modification
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) throw err;
                })
            })
            .catch(error => res.status(400).json({ error }));
    } else { };
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

// exports.modifySauce = (req, res, next) => {
//     const sauceObject = req.file ? {
//         ...JSON.parse(req.body.sauce),
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };

//     delete sauceObject._userId;
//     Sauce.findOne({ _id: req.params.id })
//         .then((sauce) => {
//             if (sauce.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//                     .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
//                     .catch(error => res.status(401).json({ error }));
//             }
//         })
//         .catch((error) => {
//             res.status(400).json({ error });
//         });
// };

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // if (sauce.userId != req.auth.userId) {
            //     res.status(401).json({ message: 'Not authorized' });
            // } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            // }
        })
        .catch(error => res.status(500).json({ error }));
};

// Liker et disliker une sauce
exports.likeSauce = (req, res, next) => {
    const sauceLikeObject = req.body;
    console.log(sauceLikeObject);
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            // like = +1
            if ((!sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 1)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Like ajouté" }))
                    .catch((error) => { res.status(400).json({ error }) });
            };
            // like = 0
            if ((sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 0)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Like supprimé" }))
                    .catch((error) => { res.status(400).json({ error }) });
            }
            // like = -1 (dislike = +1)
            if ((!sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == -1)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Dislike ajouté" }))
                    .catch((error) => { res.status(400).json({ error }) });
            };
            // dislike = 0
            if ((sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == 0)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Dislike supprimé" }))
                    .catch((error) => { res.status(400).json({ error }) });
            }
        })
        .catch((error) => res.status(404).json({ error }));
};