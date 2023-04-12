// Importation du modèle "Sauce"
const Gravy = require('../models/Gravy');

// Export du controller qui affiche toutes les sauces
exports.getAllGravies = (req, res, next) => {
    Gravy.find()
      .then((gravies) => res.status(200).json(gravies))
      .catch((error) => res.status(400).json({ error }));
};

