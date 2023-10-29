const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
const Game = require('../../models/game')
const helperImg =(filePath,fileName, size = 400) => {
    return sharp(filePath)
        .resize(size)
        .toFile(`./optimize/videogames/${fileName}`)
}
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads/videogames')
    },
    filename: async (req, file, cb)=>{
        const gameId = req.body.gameId;
        const uniqueFileName = `${gameId}_${file.originalname}`;
    
        // Verifica si la imagen ya existe en la base de datos
        const existingGame = await Game.findOne({ _id: gameId, gameImg: uniqueFileName }).exec();
        if (existingGame) {
          // La imagen ya existe, no la guarda nuevamente.
          console.log('La imagen ya existe en la base de datos.');
          return cb(null, existingGame.gameImg);
        } else {
          // La imagen no existe, la guarda como una nueva.
          cb(null, uniqueFileName);
        }
      }
})

const upload = multer({storage})

exports.upload = upload.single('gameImg')

exports.uploadFile = (req, res) => {

    // helperImg(req.file.path,`small-resize-${req.file.filename}`, 400); 
    // helperImg(req.file.path,`medium-resize-${req.file.filename}`, 1000);
    helperImg(req.file.path,`large-resize-${req.file.filename}`, 1600);
    res.send({data: 'Imagen cargada'})
}