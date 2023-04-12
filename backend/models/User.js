// Module "mongoose" pour l'accès à la MongoDB
const mongoose = require('mongoose');

//Plugin "mongoose error" pour la gestion des erreurs 
const MongooseErrors = require('mongoose-errors');

// Plugin "mongoose-unique-validator" pour utilier un email unique par utilisateur
const uniqueValidator = require('mongoose-unique-validator');

// Schéma "user"
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(MongooseErrors);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);