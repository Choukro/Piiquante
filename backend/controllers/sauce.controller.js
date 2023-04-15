// Importation du modèle "Sauce"
const Sauce = require('../models/sauce.model');

// Export du controller qui affiche toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
};

