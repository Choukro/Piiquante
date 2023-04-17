// Importation du modèle "Sauce"
const Sauce = require('../models/sauce.model');

// Le package fs expose des méthodes pour interagir avec le système de fichiers du serveur
const fs = require('fs'); 

// Export du controller qui affiche toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
};

// Export du controller pour la création d'une sauce
exports.createSauce = async (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // URL de l'image : {http}://{localhost:3000}/images/{filename(voir multer.js)}
  });
  sauce.save()
  .then(() => res.status(201).json({message: 'Registered sauce !'}))
  .catch(error => res.status(400).json( { error }));
};

// Export du controller pour voir une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Export du controller pour modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(403).json({ message : '403: unauthorized request'});
          } else {
              Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Modified sauce !'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

// Export du controller pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        if (sauce.userId != req.auth.userId) {
          res.status(403).json({message: '403: unauthorized request'});
        } else {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => { // La méthode unlink() du package  fs  permet de supprimer un fichier du système de fichiers
              Sauce.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Deleted sauce !'})})
                  .catch(error => res.status(401).json({ error }));
          });
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    });
};

// Export du controller pour liker/disliker une sauce
exports.likeSauce = (req, res, next) => {
  const {like, userId} = req.body // like === 0, -1, 1
  if (![0,-1,1].includes(like)) return res.statut(403).send({ message: 'Invalid like value'})

  if (like === 1 || like === -1) {
    Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
        //const votersArray = like === 1 ? sauce.usersLiked : sauce.usersDisliked
        //console.log("tableau des votes : ", votersArray)
        //if (votersArray.includes(userId)) return res.status(401).json({ message: 'Unauthorised operation !'})
        if (like === 1) {
          Sauce.updateOne({ _id: req.params.id }, {
            $push: { usersLiked: userId },
            $inc: { likes: +1 },
          })
            .then(() => res.status(200).json({ message: 'Like !' }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          Sauce.updateOne({ _id: req.params.id }, {
            $push: { usersDisliked: userId },
            $inc: { dislikes: +1 },
          })
            .then(() => res.status(200).json({ message: 'Dislike !' }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  } else {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
              Sauce.updateOne({ _id: req.params.id }, {
                  $pull: { usersLiked: userId },
                  $inc: { likes: -1 },
              })
                .then(() => res.status(200).json({ message: 'Removed like !' }))
                .catch((error) => res.status(400).json({ error }))
          } else {
              Sauce.updateOne({ _id: req.params.id }, {
                $pull: { usersDisliked: userId },
                $inc: { dislikes: -1 },
              })
                .then(() => res.status(200).json({ message: 'Removed dislike !' }))
                .catch((error) => res.status(400).json({ error }))
          };
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  };
};