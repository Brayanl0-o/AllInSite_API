const jwt = require('jsonwebtoken')
const User = require('../models/user')
// const config =require('../config')
const secret = process.env.SECRET

//  Middleware to verify the token in the header 
const authJwt ={
    verifyToken:async(req, res, next)=>{
        // Check if the token is present in the header
        let token = req.headers['x-access-token']
        if(!token) return res.status(403).json({message:'no token'})

        // Decode and verify the token using the config.SECRET to extract user data
        try{
            const decoded = jwt.verify(token,secret)
            req.userId = decoded.id

            // Query the bd to check if the user exists
            const user = await User.findById(req.userId,{password:0})
            if(!user) return res.status(404).json({message:'no user found'})
            
            req.userRoles = user.roles;

            next()
        }catch(error){
            res.status(401).json({message:'No autorizado'})
        }
    }
}

module.exports = authJwt