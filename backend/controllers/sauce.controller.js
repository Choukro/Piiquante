// Importation du modèle "Sauce"
const Sauce = require('../models/sauce.model');

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
  .then(() => res.status(201).json({message: 'Sauce enregistré !'}))
  .catch(error => res.status(400).json( { error }));
};

