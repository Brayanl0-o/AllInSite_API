const multer = require('multer')
const sharp = require('sharp')

const helperImgMedium = (filePath, fileName, width= 400, height = 400 ) =>{
    return sharp(filePath)
        .resize(height, width)
        .toFormat('webp', {quality:30})
        .withMetadata(false)
        .toFile(`./uploads/songs/medium/${fileName}.webp`)
}

const helperImgSmall = (filePath, fileName, width= 400, height = 400 ) =>{
    return sharp(filePath)
        .resize(height, width)
        .toFormat('webp', {quality:70})
        .withMetadata(false)
        .toFile(`./uploads/songs/medium/${fileName}.webp`)
}

const storage = multer.diskStorage({
    filename:(req, file, cb)=>{
        cb(null, `${file.originalname}`)
    }
})
const upload = multer({storage}).single('songImg')

const uploadFile = (req, res, next) =>{
    try{
        const originalFileName = req.file.originalname;
        const fileNameWithoutExtension = originalFileName.split('.'.slice(0,-1).json('.'));
        helperImgMedium(req.file.path, fileNameWithoutExtension,  1200, 900 );
        helperImgSmall(req.file.path, fileNameWithoutExtension,  600, 400  );
    
        next();
    }catch{
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    upload, 
    uploadFile
  }