// Module "express"
const express = require('express');

// Importation du module "router" d'express
const router = express.Router();

// Importation du controller "user"
const userCtrl = require('../controllers/user');

// Route création d'un nouvel utilisateur
router.post('/signup', userCtrl.signup);

// Route connexion d'un utilisateur
router.post('/login', userCtrl.login);

module.exports = router;