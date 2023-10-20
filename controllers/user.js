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

            return res.status(200).json({message:"Created user",user: savedUser})
        
        }catch(error){
            return res.status(500).json({msg:"A server error occurred", details: error.message})
        }
    },
    getUser:async(req, res)=>{
        try{
            const users = await User.find({})
            res.json(users.reverse())
        }catch(error){
            return res.status(500).json({msg:"A server error occurred", details: error.message})
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
    },
    updateUser:async(req, res)=>{
        try{
            const {id } = req.params;
            const updatedUserData = req.body;

            // Encuentra al usuario por su ID y actualiza sus datos
            const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
                new: true,
            });

            if (!updatedUser) {
                return res.status(404).json({ message: 'User no found ' });
            }

            // Enviar el usuario actualizado como respuesta
            res.status(200).json(updatedUser);
        }catch(error){
            res.status(500).json({ message: 'Error in User updated',msg:error });
        }
    },
    deleteUser:async(req, res)=>{
        try{
            const {id}= req.params
            await User.findByIdAndDelete(id)
            res.json({msg:'Delete'})
        }catch(error){
            return res.status(500).json({msg:error})
        }
    }
}

module.exports = controllerUser