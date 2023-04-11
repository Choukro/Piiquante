// import du module "cors" afin d'accepter les requêtes provenant de sources différentes 
const cors = require('cors');
// import du module "mongoose" pour la base de données
const mongoose = require('mongoose');
// import du package "express" (Framework node js)
const express = require('express');

mongoose.connect('mongodb+srv://bob:pibkyAG1Ny6ZqV99@cluster0.ytuhggy.mongodb.net/?retryWrites=true&w=majority',
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