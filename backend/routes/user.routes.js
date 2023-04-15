// Module "express"
const express = require('express');

// Importation du module "router" d'express
// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l'application
const router = express.Router();

// Importation du controller "user"
const userCtrl = require('../controllers/user.controller');

// Route création d'un nouvel utilisateur
router.post('/signup', userCtrl.signup);

// Route connexion d'un utilisateur
router.post('/login', userCtrl.login);

module.exports = router;