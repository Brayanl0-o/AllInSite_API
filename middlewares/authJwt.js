const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authJwt ={
    verifyToken:async(req, res, next)=>{
        let token = req.headers['x-access-token']

        if(!token) return res.status(403).json({message:'no token'})

        try{
            const decoded = jwt.verify(token)
            req.userId = decoded.userId

            const user = await User.findById(req.userId,{password:0})
            if(!user) return res.status(404).json({message:'no user found'})

            next()
        }catch(error){
            res.status(401).json({message:'Unauthorized'})
        }
    }
}

module.exports = authJwt