const multer = require('multer')


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
    res.send({data: 'Imagen cargada'})
}