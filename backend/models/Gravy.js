// Module "mongoose" pour l'accès à MongoDB
const mongoose = require('mongoose');

// Plugin "mongoose error" pour la gestion des erreurs
const MongooseErrors = require('mongoose-errors');

// Schéma "sauce"
const gravySchema = mongoose.Schema({

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

gravySchema.plugin(MongooseErrors);

module.exports = mongoose.model("Gravy", gravySchema);