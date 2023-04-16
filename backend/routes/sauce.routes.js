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

// Route GET pour récupérer une sauce
router.get('/:id',auth, sauceCtrl.getOneSauce);

// Route pour suprimer une sauce
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);

// Route pour modifier une sauce
router.put('/:id',auth, multer, sauceCtrl.modifySauce);

module.exports = router;