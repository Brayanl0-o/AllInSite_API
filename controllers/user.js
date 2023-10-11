const User = require('../models/user')

const controllerUser ={
    create:async (req,res) =>{
        try{
            const {firstName, lastNameuserImg, userImg, email, password}= req.body
            
            const userName = '${firstName}${lastName}'

            const user = new User({
                firstName, 
                lastNameuserImg, 
                userImg,
                email, 
                password
            })

            user.password = await User.encryptPassword(user.password)

            const savedUser = await user.save()

            return res.status(200).json({savedUser})
        
        }catch(error){
            return res.status(500).json({msg:error})
        }
    },
    getUser:async(req, res)=>{
        try{
            const users = await User.find({})
            res.json(users.reverse())
        }catch(error){
            return res.status(500).json({msg:error})
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