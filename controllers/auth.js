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
        console.log(req.userId)
        console.log(req.newPassword)
        //Created a new alt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // cryptinh new password using new salt 
        const hashedPassword = await bcrypt.hash(newPassword, salt)
      
        const user = await User.findByIdAndUpdate(
          {_id:id},
          {password: hashedPassword}
        );

        res.status(201).json({message: "Password changed"})
      
      }catch(error){
        res.status(401).json({status:401, error:"Server error"});
      }
    }
}
module.exports = controllerAuth