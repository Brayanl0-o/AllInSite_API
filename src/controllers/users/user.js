const User = require('../../models/user')
const fs = require('fs')
const path = require('path')

const controllerUser ={
    // Function for creating new user
    create:async (req,res) =>{
        try{
            // Extract data de 'req.body'
            const {firstName, lastName, userImg, email, password}= req.body;
            const userName = '${firstName}${lastName}';

            // Check if email ready is in use 
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                // If email existing, return an error
                return res.status(400).json({ error: "El correo electrónico ya está en uso" });
            };

            // Creating a new user's instance 
            const user = new User({
                firstName, 
                lastName, 
                userImg,
                email, 
                password
            });

            // Using before instance for extract password and encrypt him
            user.password = await User.encryptPassword(user.password);

            // If everything is well, save the user
            const savedUser = await user.save();

            // If everything is well, show menssage 'Created user'
            return res.status(200).json({message:"Created user",user: savedUser});
        
        }catch(error){
            // If some left bad, show a error
            return res.status(500).json({msg:"A server error occurred", details: error.message});
        }
    },
    // Function for retrieving all users
    getUser:async(req, res)=>{
        try{
            // Retrieve all users from the database
            const users = await User.find({});

            // Return the users in reverse order
            res.json(users.reverse());
        }catch(error){
            // If something goes wrong, show an error
            return res.status(500).json({msg:"A server error occurred", details: error.message});
        }
    },
    // Function for retrieving a user by ID
    getUserById: async(req, res) =>{
        try{
            // Retrieve the Id from 'req.params'
            const {id}= req.params;

            // Retrieve the user by Id from the database
            const user = await User.findById(id);

            // Return the user in JSON format
            res.json(user);
        }catch(error){
            // If something goes wrong, show an error
            return res.status(500).json({msg:error});
        }
    },
    // Function for updating a user
    updateUser:async(req, res)=>{
        try{
            // Retrieve the Id from 'req.params'
            const {id } = req.params;

            // Retrieve the user data from 'req.body'
            const updatedUserData = req.body;

            // Retrieve the user image from 'req.file'
            const updateUserImg = req.file;

            // Retrieve the user by Id from the database
            const currentUser = await User.findById(id);
            
            // Retrieve a name for the user image without extension
            const fileNameWithoutExtension = currentUser.userImg.replace(/\..+$/,'');

            if(updateUserImg && currentUser && currentUser.userImg){
                // Retrieve the correct url with 'path.resolve' and '__dirname' for an absolute url
                const imagePathMedium = path.resolve(__dirname,'../../../uploads/users/medium/',`${fileNameWithoutExtension}.webp` );
                const imagePathSmall = path.resolve(__dirname,'../../../uploads/users/small/',`${fileNameWithoutExtension}.webp` );
                
                // Retrieve the old image using 'fs.promises.unlink'
                await fs.promises.unlink(imagePathMedium);
                await fs.promises.unlink(imagePathSmall);
            }

            // Validate the user image
            if (updateUserImg){
                // Assign the user image to the filename
                updatedUserData.userImg = updateUserImg.filename; 
            }

            // Find and update the user in the database
            const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
                new: true,
            });

            // If the user is not found, show an error message
            if (!updatedUser) {
                return res.status(404).json({ message: 'User no found ' });
            }
                
            // Send the updated user as a response
            res.status(200).json(updatedUser);
        }catch(error){
            // If something goes wrong, show an error
            console.error('Error to update userImg  ',error);
            res.status(500).json({ message: 'Error in User updated',msg:error });
        }
    },
    // Function for deleting an user
    deleteUser:async(req, res)=>{
        try{
            // Retrieve the Id from 'req.params'
            const {id}= req.params;

            // Find and delete the user in the database
            await User.findByIdAndDelete(id);
            // Send a success message as a response
            res.json({msg:'Delete'});
        }catch(error){
            // If something goes wrong, show an error
            return res.status(500).json({msg:error});
        }
    }
}

module.exports = controllerUser;