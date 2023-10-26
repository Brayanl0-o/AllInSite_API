const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    gameName: {
        type: String,
        required: [true,"Ingresa el nombre del juego"],   
        maxLength: 50
    },
    gameImg: {
        type: String,
        required: false
    },
    platform: {
        type: String,
        required: false,
        maxLength: 60
    },
    releaseDate: {
        type: Date,
        required: false
    },
    developer: {
        type: String,
        required: false,
        maxLength: 40
    },
    genre: {
        type: String,
        required: false,
        maxLength: 30
    },
    averageRating: {
        type: Number,
        required: false,

    },
    descriptionGame:{
        type: String,
        maxLength: 550,
        required: false,
    }
},{versionKey: false});

module.exports = mongoose.model('Game', gameSchema)