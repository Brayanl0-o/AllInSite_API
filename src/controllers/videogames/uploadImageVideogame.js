const multer = require('multer')
const sharp = require('sharp')

const helperImgMedium =(filePath,fileName, width = 400, height = 400) => {
    return sharp(filePath)
        .resize(height, width)
        .toFormat('webp', {quality: 30})
        .withMetadata(false)
        .toFile(`./uploads/videogames/medium/${fileName}.webp`)
}

const helperImgSmall =(filePath,fileName, width = 400, height = 400) => {
  return sharp(filePath)
      .resize(height, width)
      .toFormat('webp', {quality: 70})
      .withMetadata(false)
      .toFile(`./uploads/videogames/small/${fileName}.webp`)
}

const storage = multer.diskStorage({

    filename:  (req, file, cb)=>{
      cb(null, `${file.originalname}`)
      }
})

const upload = multer({storage}).single('gameImg')


const uploadFile = (req, res, next) => {

  try {
    const originalFileName = req.file.originalname;
    const fileNameWithoutExtension = originalFileName.split('.').slice(0, -1).join('.');
    helperImgMedium(req.file.path, fileNameWithoutExtension,  1200, 900 );
    helperImgSmall(req.file.path, fileNameWithoutExtension,  600, 400  );

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