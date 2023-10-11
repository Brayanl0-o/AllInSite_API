const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const userControllers={
    //Controlador para la creacion de Usuarios & Administradores
    signup: async (req,res) =>{
        try{
        const {firstName, lastName,userImg, email, password,phoneNumber,country,years, descriptionUser} = req.body

        const userName = `${names} ${surNames}`;
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
        return res.status(500).json(error.message)
    }
    },  
}
module.exports = userControllers