const multer = require('multer')
const User = require('../../models/user')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/users')
    },
    filename: async(req, file,cb)=> {
        const userId = req.body.userId;
        const uniqueFileName = `${userId}_${file.originalname}`;

        const existingUser = await User.findOne({ _id:userId, userImg:uniqueFileName}).exec();
            if(existingUser){
                console.log('La imagen ya existe en la base de datos.');
                return cb(null, existingUser.userImg);
            }else{
                cb(null, uniqueFileName);
            }
}
})


const upload = multer({storage})

exports.upload = upload.single('userImg')

exports.uploadFile = (req, res)=> {

    res.send({ data: 'Imagen cargada'})
}