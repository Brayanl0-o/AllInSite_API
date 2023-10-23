const multer = require('multer')
const sharp = require('sharp')
const helperImg =(filePath,fileName, size = 400) => {
    return sharp(filePath)
        .resize(size)
        .toFile(`./optimize/${fileName}`)
}
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        // const ext = file.originalname.split('').pop() //Imagen.png ---> png
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

exports.upload = upload.single('myFile')

exports.uploadFile = (req, res) => {
    helperImg(req.file.path,`micro-resize-${req.file.filename}`, 20);
    helperImg(req.file.path,`small-resize-${req.file.filename}`, 100); 
    helperImg(req.file.path,`medium-resize-${req.file.filename}`, 500);
    helperImg(req.file.path,`large-resize-${req.file.filename}`, 1000);
    res.send({data: 'Imagen cargada'})
}