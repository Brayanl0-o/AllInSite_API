const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type:String,
        maxLength: 55
    },
    firstName:{
        type: String,
        required: true,
        minLength:3,
        maxLength: 30
    },
    lastName:{
        type: String,
        required: true,
        minLength:3,
        maxLength: 30
    },
    userImg: {
        type: String,
        required: false,
        default: 'default.png'
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (email) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'user email required'],
        minLength:5,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
        minLength:4,
        maxLength: 25
    },
    phoneNumber:{
        type:String,
        minLength:5,
        maxLength: 15,
    },
    country:{
        type: String,
        default: "Colombia",
        minLength:3,
        maxLength: 25
    },
    years:{
        type: Number,
        minLength: 5,
        maxLength: 100
    },
    descriptionUser:{
        type: String,
        default: "sin descripcion...",
        maxLength:400
    },
    roles:{
        type: [String]
        // default: "usuario"
    }
    

},{versionKey: false,timestamps: true})

    // Encriptado de contraseña
    userSchema.statics.encryptPassword = async(password)=>{
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    //Comparar antes de comenzar
    userSchema.statics.comparePassword = async (password, receivedPassword)=>{
        return await bcrypt.compare(password, receivedPassword)
    }

    //hasheo de password
    userSchema.pre("save", async function (next){
        const user = this;
        if(!user.isModified("password")){
            return next();
        }
        const hash = await bcrypt.hash(user.password, 10);
        user.password =hash;
        next();
    })
module.exports = mongoose.model('User', userSchema)