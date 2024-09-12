const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const sanitizeFileName = (fileName) => {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, ''); 
}

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
// const helperImg =(filePath,fileName, width = 400, height = 400) => {
//   return sharp(filePath)
//       .resize(height, width)
//       .toFormat('webp', {quality: 90})
//       .withMetadata(false)
//       .toFile(`./uploads/forSite/${fileName}.webp`)
// }
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/videogames/temp'); // Directorio temporal
  },
  filename: (req, file, cb)=>{
    const sanitizedFileName = sanitizeFileName(path.parse(file.originalname).name);
    cb(null, `${sanitizedFileName}${path.extname(file.originalname)}`);
  },
})

const upload = multer({storage}).single('gameImg')


const uploadFile = (req, res, next) => {

  try {
    const originalFileName = req.file.originalname;
    const sanitizedFileName = sanitizeFileName(path.parse(originalFileName).name);
    helperImgMedium(req.file.path, sanitizedFileName,  1200, 900 );
    helperImgSmall(req.file.path, sanitizedFileName,  600, 400  );
    setTimeout(() => {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo temporal:', err);
        } else {
          console.log('Archivo temporal eliminado');
        }
      });
    }, 1000);

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