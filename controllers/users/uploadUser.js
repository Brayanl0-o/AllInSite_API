const multer = require('multer')
const User = require('../../models/user')
const sharp = require('sharp')
const helperImage = (filePath, fileName, width = 400 , height = 400) => {
    return sharp (filePath)
        .resize(width, height)
        .toFormat('webp', {quality: 80}) 
        .toFile(`./uploads/users/${fileName}.webp`)  
}
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, './uploads/users')
    // },
    filename: async(req, file,cb)=> {
        // const userId = req.body.userId;
        // const uniqueFileName = `${userId}_${file.originalname}`;
        cb(null, `${file.originalname}`)
        // const existingUser = await User.findOne({ _id:userId, userImg:uniqueFileName}).exec();
        //     if(existingUser){
        //         console.log('La imagen ya existe en la base de datos.');
        //         return cb(null, existingUser.userImg);
        //     }else{
        //         cb(null, uniqueFileName);
        //     }
}
})


const upload = multer({storage}).single('userImg')


const uploadFile = (req, res, next)=> {
    try {
        const originalFileName = req.file.originalname;
        const fileNameWithoutExtension = originalFileName.split('.').slice(0, -1).join('.');
        helperImage(req.file.path, fileNameWithoutExtension,   1500, 1100 );
          console.log('Ejecutó helperImg');
          // res.send({ data: 'Imagen cargada' });
          next();
      } catch (error) {
          console.error('Error al procesar la carga de imagen para videogame:', error);
          res.status(500).send({ error: 'Error interno del servidor' });
      }
    // helperImage(req.file.path,`${req.file.filename}`, 1500, 1100)
    // // res.send({ data: 'Imagen cargada'})
    // next();
}

module.exports = {
    upload, 
    uploadFile
  }