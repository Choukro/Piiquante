// Module "mongoose" pour l'accès à MongoDB
const mongoose = require('mongoose');

// Plugin "mongoose error" pour la gestion des erreurs
const mongooseErrors = require('mongoose-errors');

// Schéma "sauce"
// La méthode Schema de Mongoose permet de créer un schéma de données pour ma base de données MongoDB
const sauceSchema = mongoose.Schema({

  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0}, // par défaut 0 
  dislikes: { type: Number, default: 0},
  usersLiked: { type: Array, default: []}, // par défaut tableau vide
  usersDisliked: { type: Array, default: []}, // par défaut tableau vide
  
});

sauceSchema.plugin(mongooseErrors);

module.exports = mongoose.model("Sauce", sauceSchema); //La méthode model transforme ce modèle en un modèle utilisable