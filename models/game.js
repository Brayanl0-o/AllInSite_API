const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    gameName: {
        type: String,
        required: [true,"Ingresa el nombre del juego"],
        minLength:4,   
        maxLength: 60
    },
    gameImg: {
        type: String,
        required: false
    },
    platform: {
        type: String,
        required: false,
        minLength: 5,
        maxLength: 60
    },
    releaseDate: {
        type: Date,
        required: false
    },
    developer: {
        type: String,
        required: false,
        minLength: 4,
        maxLength: 60
    },
    genre: {
        type: String,
        required: false,
        minLength: 4,
        maxLength: 30
    },
    averageRating: {
        type: Number,
        required: false,
        minLength: 1,
        maxLength: 2,
    },
    descriptionGame:{
        type: String,
        maxLength: 450,
        required: false,
    }
},{versionKey: false});

module.exports = mongoose.model('Game', gameSchema)