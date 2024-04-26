const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    gameName: {
        type: String,
        required: true,
        minLength:4,   
        maxLength: 60
    },
    gameImg: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true,

    },
    developer: {
        type: String,
        required: false,
        maxLength: 60
    },
    genre: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 55,
    },
    averageRating: {
        type: Number,
        minLength: 1,
        maxLength: 2,
        required: true,

    },
    descriptionGame:{
        type: String,
        maxLength: 1050,
        required: true,
    },
    gameTrailer:{
        type:String,
        required: false,
    },
    platform: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 60
    },

},{versionKey: false});

module.exports = mongoose.model('Game', gameSchema)