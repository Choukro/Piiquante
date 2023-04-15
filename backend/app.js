// Module "cors" afin d'accepter les requêtes provenant de différentes sources 
const cors = require('cors');

// Module "mongoose" pour la base de données
const mongoose = require('mongoose');

// Module "express"
const express = require('express');

// Module "morgan" pour retranscrire les informations des requêtes dans le terminal
const morgan = require('morgan');

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


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;