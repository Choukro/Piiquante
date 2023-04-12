// Module "express"
const express = require('express');

// Importation du module "router" d'express
const router = express.Router();

// Importation du controller "user"
const userCtrl = require('../controllers/user');

// création d'un nouvel utilisateur
router.post('/signup', userCtrl.signup);

// connexion d'un utilisateur
router.post('/login', userCtrl.login);

// exportation du module "router"
module.exports = router;