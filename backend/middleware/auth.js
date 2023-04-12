// Module "jsonwebtoken" pour créer le token d'authentification
const jwt = require('jsonwebtoken');

// Module "dotenv" pour utiliser les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env.TOKEN;

// Middleware qui vérifie l'authentification de la requête
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, TOKEN);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId,
       };
    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};