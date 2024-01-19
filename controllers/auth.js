const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: config.ADMIN_EMAIL,
      pass: config.ADMIN_PASSWORD,
  },
  });

const controllerAuth={
    // Function for register a new user (rol user & admin)
    signup: async (req,res) =>{
        try{
        // Extract data from 'req.body'
        const {firstName, lastName, email, password, phoneNumber, country, years, descriptionUser} = req.body;
        // Extract userImg from 'req.file'
        const userImg =  req.file?.filename;

        // Check if the user image already exists
        const existingImg = await User.findOne({userImg: userImg}).exec();
        if(existingImg){
          // If the image already exists, return an error
          return res.status(400).json({ message: 'La imagen ya existe en la base de datos.' });
        }

        const userName = `${firstName} ${lastName}`;

        // Retrieve 'roles' from req.body.roles or default to ["usuario"]
        const roles = req.body.roles ? req.body.roles : ["usuario"];
        
        // Creating a new instance of the user
        const newUser = new User({
            userName,
            firstName,
            lastName,
            userImg,
            email,
            password,
            phoneNumber,
            country,
            years,
            descriptionUser,
            roles
        });
       
        // If everything is well, save the new user
        const savedUser= await newUser.save();

        // Generate token data for signing the token
        const tokenData = {id: savedUser._id, roles:savedUser.roles};
        // console.log('Datos para firmar el token:', tokenData);
        
        // Sign the token with tokenData using config.SECRET
        const token = jwt.sign(tokenData, config.SECRET,{
            expiresIn: 86400 //token expiration time (every 24h) Time
        })

        // Decoded token for detect errors
        // const decodedToken = jwt.decode(token);
        // // console.log('Contenido del token decodificado:', decodedToken);
        
        // If everything is well,  send the token and saved user as a response
        res.status(200).json({token, savedUser});
      }catch(error){
          // If some left bad, show a error
          return res.status(500).json({error:"Error interno del servidor", details: error.message});
      }
    },
    // Function for user login
    login: async (req, res) => {
        try {
          // Find a user in the database with the provided email
          const userFound = await User.findOne({ email: req.body.email });
          
          // Check if the user exists
          if (!userFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
          }

          // Compare the provided password with the stored password using bcrypt  
          const isPasswordValid = await User.comparePassword(req.body.password, userFound.password);

          // Check if the password is valid
          if (!isPasswordValid) {
            return res.status(401).json({ token: null, message: 'Contraseña inválida' });
          }

          // Once authenticated, generate a new JWT token
          const token = jwt.sign({ id: userFound._id, roles: userFound.roles }, config.SECRET, {
            expiresIn: 86400, // Token expiration time (every 24h)
          });

          // Send the token and user information as a response
          res.json({ token, userFound: { _id: userFound._id, roles: userFound.roles } });
      } catch (error) {
         // If an internal server error occurs, show an error
        return res.status(500).json({ msg: 'Error interno del servidor', details: error.message });
      }
    },
    getsingup: async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users.reverse());
        } catch (error) {
            return res.status(500).json({ msg:"Error interno del servidor", details: error.message });
        }
    },

    // send email Link For reset Password
    sendPasswordLink : async (req, res) => {
      const email = await req.body.email;

      if (!email) {
          return res.status(406).json({ message: "Ingresa un correo válido." });
      }

      try {
          const userFound = await User.findOne({ email: req.body.email });

          if (!userFound) {
          return res.status(406).json({ message: "Ingresa un correo válido." });
          }


        // token generate for reset password
          const token = jwt.sign({ id: userFound._id }, config.SECRET, {
          expiresIn: 3600, // 1 hour
          });

          const mailOptions = {
          from: config.ADMIN_EMAIL,
          to: email,
          subject: "Enviando correo electrónico para restablecer la contraseña",
          text: `Este Enlace es válido por 1 horas ${config.URL}/reset-password/${token}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log("error", error);
              return res.status(406).json({ message: "El correo no fue enviado.", error });
          } else {
              console.log("Email sent", info.response);
              return res.status(200).json({
              status: 200,
              message: "El correo fue enviado satisfactoriamente.",
              });
          }
          });
      } catch (error) {
          return res.status(401).json({ status: 401, message: "Usuario inválido." });
      }
    },
    changePassword: async (req, res) => {
      try{
        const newPassword = req.body.password; //Get password request's body
        const id = req.userId;
        
        //Created a new alt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // cryptinh new password using new salt 
        const hashedPassword = await bcrypt.hash(newPassword, salt);
      
        const user = await User.findByIdAndUpdate(
          {_id:id},
          {password: hashedPassword}
        );

        res.status(201).json({message: "Password changed"});
      
      }catch(error){
        res.status(401).json({status:401, error:"Server error"});
      }
    }
}
module.exports = controllerAuth;