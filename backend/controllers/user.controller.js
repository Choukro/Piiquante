//Module "bcrypt" pour le hachage du mot de passe
const bcrypt = require('bcrypt');

// Module "jsonwebtoken" pour créer le token d'authentification
const jwt = require('jsonwebtoken');

// Module "dotenv" pour utiliser les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env.TOKEN;
const HASH = process.env.HASH;

// Import du modèle "User"
const User = require('../models/user.model');

// Fonction "signup"
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, HASH) // méthode hash() de bcrypt afin de créer un hash crypté des mots de passe des utilisateurs pour les enregistrer de manière sécurisée dans la base de données
        .then(hash => {
            const user = new User ({
                email : req.body.email,
                password : hash,
            });
            user.save()
                .then(()=> res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


// Fonction "login" 
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});
            } else {
                bcrypt.compare(req.body.password, user.password) // méthode compare de bcrypt : compare un string avec un hash pour vérifier si un mot de passe entré par l'utilisateur correspond à un hash sécurisé enregistré en base de données
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                    } else {
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign( // méthode sign() du package jsonwebtoken utilise une clé secrète pour chiffrer un token qui peut contenir un payload personnalisé (ID de l'utilisateur) et avoir une validité limitée
                                { userId: user._id},
                                TOKEN,
                                { expiresIn: '4h' }
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json({ error }));
            }  
        })
        .catch(error => res.status(500).json({ error }));
 };