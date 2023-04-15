// Module "express"
const express = require('express');

// Importation du module "router" d'express
const router = express.Router();

// Importation du middleware "auth" 
const auth = require('../middleware/auth');

// Importataion du controller "sauce"
const sauceCtrl = require('../controllers/sauce.controller');

// Route de toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;