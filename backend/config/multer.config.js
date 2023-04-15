// Module "multer"
const multer = require('multer');

// Dictionnaire des extensions
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/gif': 'gif',
};

const storage = multer.diskStorage({ //Méthode diskStorage() qui configure le chemin et le nom de fichier pour les fichiers entrants
  destination: (req, file, callback) => { //la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images
    callback(null, 'images');
  },
  filename: (req, file, callback) => { //la fonction filename indique à multer d'utiliser le nom d'origine
    const nameSauce = file.originalname.split(' ').join('_'); //de remplacer les espaces par des underscores 
    const name = nameSauce.split(".")[0];
    //console.log(name);
    const extension = MIME_TYPES[file.mimetype]; 
    callback(null, name + Date.now() + '.' + extension); // et d'ajouter un timestamp Date.now() comme nom de fichier. Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
  }
});

module.exports = multer({ storage }).single('image'); //Méthode single() qui crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.