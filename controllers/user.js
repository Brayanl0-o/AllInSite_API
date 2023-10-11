const User = require('../models/user')

const controllerUser ={
    create:async (req,res) =>{
        try{
            const {firstName, lastName, userImg, email, password}= req.body
            const userName = '${firstName}${lastName}'

            // Verificar si el correo electrónico ya está en uso
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                // Si el correo electrónico ya existe, retorna un error
                return res.status(400).json({ error: "El correo electrónico ya está en uso" });
            }

            const user = new User({
                firstName, 
                lastName, 
                userImg,
                email, 
                password
            })

            user.password = await User.encryptPassword(user.password)

            const savedUser = await user.save()

            return res.status(200).json({message:"Usuario creado",user: savedUser})
        
        }catch(error){
            return res.status(500).json({msg:"Ocurrió un error en el servidor", details: error.message})
        }
    },
    getUser:async(req, res)=>{
        try{
            const users = await User.find({})
            res.json(users.reverse())
        }catch(error){
            return res.status(500).json({msg:"Ocurrió un error en el servidor", details: error.message})
        }
    },
    getUserById: async(req, res) =>{
        try{
            const {id}= req.params
            const user = await User.findById(id)
            res.json(user)
        }catch(error){
            return res.status(500).json({msg:error})
        }
    }
}

module.exports = controllerUser