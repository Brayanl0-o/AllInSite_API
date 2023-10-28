const multer = require('multer')
const sharp = require('sharp')
const helperImg =(filePath,fileName, size = 400) => {
    return sharp(filePath)
        .resize(size)
        .toFile(`./optimize/videogames/${fileName}`)
}
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads/videogames/')
    },
    filename: (req, file, cb)=>{
        // const ext = file.originalname.split('').pop() //Imagen.png ---> png
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

exports.upload = upload.single('gameImg')

exports.uploadFile = (req, res) => {

    helperImg(req.file.path,`small-resize-${req.file.filename}`, 400); 
    helperImg(req.file.path,`medium-resize-${req.file.filename}`, 700);
    helperImg(req.file.path,`large-resize-${req.file.filename}`, 1600);
    res.send({data: 'Imagen cargada'})
}