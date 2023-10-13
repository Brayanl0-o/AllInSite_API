const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../config')

const controllerAuth={
    //Controlador para la creacion de Usuarios & Administradores
    signup: async (req,res) =>{
        try{
        const {firstName, lastName,userImg, email, password,phoneNumber,country,years, descriptionUser} = req.body

        const userName = `${firstName} ${lastName}`;
        const userRegis = new User({
            userName,
            firstName, 
            lastName,
            userImg, 
            email, 
            password,
            phoneNumber,
            country,
            years, 
            descriptionUser
        })
        // Asigna un rol al usuario
        userRegis.roles = ['usuario'];
        
        const savedUser= await userRegis.save()

        const token = jwt.sign({id: savedUser._id}, config.SECRET,{
            expiresIn: 86400 //tiempo de que tarda en expirar el token (cada 24h) 
        })
        res.status(200).json({token, savedUser})
    }catch(error){
        return res.status(500).json({error:"Error interno del servidor", details: error.message})
    }
}, 
login: async (req, res) => {
    try {
      const userFound = await User.findOne({ email: req.body.email });
  
      if (!userFound) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
  
      const isPasswordValid = await User.comparePassword(req.body.password, userFound.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ token: null, message: 'Contraseña inválida' });
      }
  
      // Una vez autenticado, genera un nuevo token
      const token = jwt.sign({ id: userFound._id, role: userFound.role }, config.SECRET, {
        expiresIn: 86400
      });
  
      res.json({ token, userFound: { _id: userFound._id, role: userFound.role } });
    } catch (error) {
      return res.status(500).json({ msg: 'Error interno del servidor', details: error.message });
    }
  },
    getsingup: async (req, res) => {
        try {
            const users = await User.find({})
            res.json(users.reverse())
        } catch (error) {
            return res.status(500).json({ msg:"Error interno del servidor", details: error.message })
        }
}, 
}
module.exports = controllerAuth