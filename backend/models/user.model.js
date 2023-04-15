// Module "mongoose" pour l'accès à la MongoDB
const mongoose = require('mongoose');

//Package "mongoose error" pour la gestion des erreurs 
const mongooseErrors = require('mongoose-errors');

// Package "mongoose-unique-validator" pour améliorer les messages d'erreur lors de l'enregistrement de données uniques (email)
const uniqueValidator = require('mongoose-unique-validator');

// Schéma "user"
// La méthode Schema de Mongoose permet de créer un schéma de données pour la base de données MongoDB
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(mongooseErrors);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); //La méthode model transforme ce modèle en un modèle utilisable