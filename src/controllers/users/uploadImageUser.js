const multer = require('multer')
const sharp = require('sharp')

const helperImageMedium = (filePath, fileName, width = 400 , height = 400) => {
    return sharp (filePath)
        .resize(width, height)
        .toFormat('webp', {quality: 65}) 
        .toFile(`./uploads/users/medium/${fileName}.webp`)  
}
const helperImageSmall = (filePath, fileName, width = 400 , height = 400) => {
    return sharp (filePath)
        .resize(width, height)
        .toFormat('webp', {quality: 70}) 
        .toFile(`./uploads/users/small/${fileName}.webp`)  
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
        helperImageMedium(req.file.path, fileNameWithoutExtension,   1000, 700 );
        helperImageSmall(req.file.path, fileNameWithoutExtension,   500, 300 );

        next();
      } catch (error) {
          console.error('Error al procesar la carga de imagen para usuario:', error);
          res.status(500).send({ error: 'Error interno del servidor' });
      }
}

module.exports = {
    upload, 
    uploadFile
  }