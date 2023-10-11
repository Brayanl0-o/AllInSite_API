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

        const savedUser= await userRegis.save()

        const token = jwt.sign({id: savedUser._id}, config.SECRET,{
            expiresIn: 86400 //tiempo de que tarda en expirar el token (cada 24h) 
        })
        res.status(200).json({token, savedUser})
    }catch(error){
        return res.status(500).json({error:"Error interno del servidor", details: error.message})
    }
    }, 
    signin: async (req,res) =>{
        try{
        const userFound =await User.findOne({email: req.body.email}).populate("admin") 

        if (!userFound) return res.status(400).json({message: 'user not found '}) // Validaciones para autentificar el usuario

        const mathPassword = await User.comparPassword(req.body.password, userFound.password) // Valida si la contraseña ingresada es la correcta

        if (!mathPassword) return res.status(401).json({token: null, message: 'invalid password '})
        
        //una vez autentificado loguea y genera un nuevo token
        const token = jwt.sign({id: userFound._id, role: userFound.admin}, config.SECRET,{
            expiresIn: 86400
        })

        res.json({token, userFound: {_id: userFound._id , role: userFound.admin}})
    }catch(error){
        return res.status(500).json({ msg:"Error interno del servidor", details: error.message })
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