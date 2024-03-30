const jwt = require('jsonwebtoken')
const User = require('../models/user')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
require('dotenv').config();

const firebase = require('firebase/compat/app')
require('firebase/compat/auth')
const firebaseConfig = require('../../firebase.config');
firebase.initializeApp(firebaseConfig);



const admin_email = process.env.ADMIN_EMAIL;
const admin_password = process.env.ADMIN_PASSWORD;
const url_env = process.env.URL;
const secret = process.env.SECRET;
// const { validationResult } = require('express-validator')

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: admin_email,
      pass: admin_password,
  },
  });

const controllerAuth={
    // Funtion to signIn with google
    signInWithGoogle: async (req, res)=>{
      try{
        const idToken = req.body.access_token;
        console.log('token receive from frontend:', idToken)

        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, null, null);

        console.log('credential procces:', credential)

        const userCredential = await firebase.auth().signInWithCredential(credential);
        console.log('userCredential receive from signInWithGoogle:', userCredential)

        res.status(200).json({ user: userCredential.user })

      }catch(error){
        return res.status(500).json({error:"Error al autenticar con Google:", details: error.message});
      }
    },
    // Funtion to test from postman
    signInWithGooglePostman: async (req, res) => {
      try {
        const { access_token } = req.body;

        if (!access_token) {
          return res.status(400).json({ error: 'Token de acceso no proporcionado' });
        }

        return res.status(200).json({ access_token });
      } catch (error) {
        return res.status(500).json({ error: 'Error al autenticar con Google', details: error.message });
      }
    },
    // Function for register a new user (rol user & admin)
    signup: async (req,res) =>{
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   // Si hay errores de validación, devuelve una respuesta con los errores
        //   console.log('Errores de validación:', errors.array());
        //   return res.status(400).json({ errors: errors.array() });
        // }
        try{
        // Extract data from 'req.body'
        const {firstName, lastName, email, password, phoneNumber, country, years, descriptionUser} = req.body;
        // Extract userImg from 'req.file'
        const userImg =  req.file?.filename;
        console.log('req', req.file, req.body)
        // Check if the user image already exists
        const existingImg = await User.findOne({userImg: userImg}).exec();
        if(existingImg){
          // If the image already exists, return an error
          return res.status(400).json({ message: 'La imagen ya existe en la base de datos.' });
        }


        // Retrieve 'roles' from req.body.roles or default to ["usuario"]
        const roles = req.body.roles ? req.body.roles : ["usuario"];
        
        // Creating a new instance of the user
        const newUser = new User({
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
        console.log('new_user',newUser)
        // If everything is well, save the new user
        const savedUser= await newUser.save();

        // Generate token data for signing the token
        const tokenData = {id: savedUser._id, roles:savedUser.roles};
        // console.log('Datos para firmar el token:', tokenData);
        
        // Sign the token with tokenData using config.SECRET
        const token = jwt.sign(tokenData, secret,{
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
          const token = jwt.sign({ id: userFound._id, roles: userFound.roles }, secret, {
            expiresIn: 86400, // Token expiration time (every 24h)
          });

          // Send the token and user information as a response
          res.json({ token, userFound: { _id: userFound._id, roles: userFound.roles } });
      } catch (error) {
         // If an internal server error occurs, show an error
        return res.status(500).json({ msg: 'Error interno del servidor', details: error.message });
      }
    },
    // Function to get all signed-up users
    getsingup: async (req, res) => {
        try {
            // Retrieve all users from the database
            const users = await User.find({});

            // Return the users in reverse order
            res.json(users.reverse());
        } catch (error) {
            // If an internal server error occurs, show an error
            return res.status(500).json({ msg:"Error interno del servidor", details: error.message });
        }
    },
    // Function to send an email link for password reset
    sendPasswordLink : async (req, res) => {
      const email = await req.body.email;
      console.log(req.body.email)
      // Check if a valid email is provided
      if (!email) {
          return res.status(406).json({ message: "Ingresa un correo válido." });
      }

      try {
          // Find the user in the database based on the provided email
          const userFound = await User.findOne({ email: req.body.email });

          // Check if the user exists
          if (!userFound) {
            return res.status(406).json({ message: "Ingresa un correo válido." });
          }


          // Generate a token for resetting the password
          const token = jwt.sign({ id: userFound._id }, secret, {
            expiresIn: 3600, // Token expiration time: 1 hour
          });

          // Configure mail options for sending the reset password email
          const mailOptions = {
          from: admin_email,
          to: email,
          subject: "Enviando correo electrónico para restablecer la contraseña",
          text: `Este Enlace es válido por 1 horas ${url_env}/change-password/${token}`,
          };

          // Send the email with the reset password link
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
          // If an invalid user or other error occurs, show an error
          return res.status(401).json({ status: 401, message: "Usuario inválido." });
      }
    },
    // Function for changing user password
    changePassword: async (req, res) => {
      try{
        // Get the new password from the request's body
        const newPassword = req.body.password;
        // Get the user's ID from the request
        const id = req.userId;
        
        // Generate a new salt for password hashing
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the new password using the new salt 
        const hashedPassword = await bcrypt.hash(newPassword, salt);
      
        // Update the user's password in the database
        const user = await User.findByIdAndUpdate(
          {_id:id},
          {password: hashedPassword}
        );

        // Respond with a success message
        res.status(201).json({message: "Password changed"});
      
      }catch(error){
        // If a server error occurs, respond with an error message
        res.status(401).json({status:401, error:"Server error"});
      }
    }
}
module.exports = controllerAuth;