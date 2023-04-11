// module "cors" afin d'accepter les requêtes provenant de sources différentes 
const cors = require('cors');
// module "mongoose" pour la base de données
const mongoose = require('mongoose');
// Package "express"
const express = require('express');
// module "dotenv" pour utiliser les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();
const mongoDB_URI = process.env.mongoDB_URI; // Variabe d'environnement pour la connexion à la base de données MongoDB
// connexion à la base de données grâce à la variable d'environnement 
mongoose.connect(mongoDB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.get('/',(req,res) => {
    res.send('Hello World, ça va !')
})

app.use(express.json());
app.use(cors());

module.exports = app;