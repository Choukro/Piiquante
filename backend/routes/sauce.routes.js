// Module "express"
const express = require('express');

// Importation du module "router" d'express
// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l'application
const router = express.Router();

// Importation du middleware "auth" 
const auth = require('../middleware/auth');

// Importation du middleware "multer"
const multer = require('../config/multer.config');

// Importataion du controller "sauce"
const sauceCtrl = require('../controllers/sauce.controller');

// Route GET pour toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

// Route POST création d'une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

module.exports = router;