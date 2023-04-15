// Module "jsonwebtoken" pour créer le token d'authentification
// JSON web tokens sont des tokens chiffrés qui peuvent être utilisés pour l'autorisation
const jwt = require('jsonwebtoken');

// Module "dotenv" pour utiliser les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env.TOKEN;

// Middleware qui vérifie l'autorisation de la requête
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]; // fonction split pour tout récupérer après l'espace dans le header
       const decodedToken = jwt.verify(token, TOKEN); // fonction verify pour décoder le token
       const userId = decodedToken.userId; //ID utilisateur du token 
       req.auth = { // et ajout à l’objet Request afin que les différentes routes puissent l’exploiter
           userId: userId,
       };
    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};