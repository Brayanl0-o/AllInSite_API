const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    userName: {
        type:String,
        maxLength: 55
    },
    firstName:{
        type: String,
        required: true,
        maxLenth: 25
    },
    lastName:{
        type: String,
        required: true,
        maxLenth: 25
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
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
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
        type: Number,
        minLenth:3,
        maxLenth: 10
    },
    country:{
        type: String,
        default: "Colombia",
    },
    years:{
        type: Number,
        minLenth: 5,
        maxLenth: 100
    },
    descriptionUser:{
        type: String,
        default: "sin descripcion..."
    },
    admin:[{
        ref: "Admin", //Referecia a modelo de Admin
        type: mongoose.Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model('User', userSchema)