// Module "cors" afin de permettre des requêtes cross-origin (et empêcher des erreurs CORS)
// Des headers spécifiques de contrôle d'accès sont précisés pour tous nos objets de réponse
const cors = require('cors');

// Package "mongoose" pour la base de données
// Il facilite les interactions entre l'application Express et la base de données MongoDB
const mongoose = require('mongoose');

// Module "express"
const express = require('express');

// Module "morgan" pour retranscrire les informations des requêtes dans le terminal afin de rendre le serveur plus facile à déboguer
const morgan = require('morgan');

// Module "path" pour la gestion de chemins de stockage
const path = require('path');

// Module "dotenv" pour utiliser les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();
const mongoDB_URI = process.env.mongoDB_URI; // Variabe d'environnement pour la connexion à la base de données MongoDB

// Connexion à la MongoDB grâce à la variable d'environnement 
mongoose.connect(mongoDB_URI, 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
const userRoutes = require('./routes/user.routes');
const sauceRoutes = require('./routes/sauce.routes');


// Middleware : bloc de code qui traite les requêtes et réponses de l'application
// La méthode app.use() permet d'attribuer un middleware à une route spécifique de l'application
app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;