// import du module "cors" afin d'accepter les requêtes provenant de sources différentes 
const cors = require('cors');
// import du module "mongoose" pour la base de données
const mongoose = require('mongoose');
// import du package "express" (Framework node js)
const express = require('express');
// import du module "dotenv" pour utiliser les variables d'environnement (ici cacher l'ID et le MDP de la base de données)
const dotenv = require('dotenv');
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI; // //import de la variabe d'environnement pour la connexion à la base da données

mongoose.connect(MONGODB_URI,
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