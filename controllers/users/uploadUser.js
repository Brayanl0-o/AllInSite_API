const multer = require('multer')
const sharp = require('sharp')

const helperImage = (filePath, fileName, width = 400 , height = 400) => {
    return sharp (filePath)
        .resize(width, height)
        .toFormat('webp', {quality: 80}) 
        .toFile(`./uploads/users/${fileName}.webp`)  
}
const storage = multer.diskStorage({

    filename: async(req, file,cb)=> {
        cb(null, `${file.originalname}`)
}
})


const upload = multer({storage}).single('userImg')

const uploadFile = (req, res, next)=> {
    try {
        const originalFileName = req.file.originalname;
        const fileNameWithoutExtension = originalFileName.split('.').slice(0, -1).join('.');
        helperImage(req.file.path, fileNameWithoutExtension,   1500, 1100 );
        next();
      } catch (error) {
          console.error('Error al procesar la carga de imagen para videogame:', error);
          res.status(500).send({ error: 'Error interno del servidor' });
      }
}

module.exports = {
    upload, 
    uploadFile
  }