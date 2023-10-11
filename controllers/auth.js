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
}
module.exports = controllerAuth