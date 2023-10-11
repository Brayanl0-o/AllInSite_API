const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    userName: {
        type:String,
        maxLength: 55
    },
    firstName:{
        type: String,
        required: true,
        maxLength: 25
    },
    lastName:{
        type: String,
        required: true,
        maxLength: 25
    },
    userImg: {
        type: String,
        required: false
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
        required: [true, 'user email required']
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type:String,
        minLength:3,
        // maxLength: 10
    },
    country:{
        type: String,
        default: "Colombia",
    },
    years:{
        type: Number,
        minLength: 5,
        maxLength: 100
    },
    descriptionUser:{
        type: String,
        default: "sin descripcion..."
    },
    roles:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Role'
    }]
},{versionKey: false,timestamps: true})

    // Encriptado de contraseña
    userSchema.statics.encryptPassword = async(password)=>{
        const salt = await bycrypt.genSalt(10)
        return await bycrypt.hash(password, salt)
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