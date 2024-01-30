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
    platform: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 60
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
        maxLength: 30
    },
    averageRating: {
        type: Number,
        minLength: 1,
        maxLength: 2,
        required: true,

    },
    descriptionGame:{
        type: String,
        maxLength: 450,
        required: true,
    },
    sizeGame:{
        type: Number,
        maxLength: 5,
        required: false,
    },
    ramGame:{
        type: Number,
        maxLength: 3,
        required: false,
    },
    processorGame:{
        type: String,
        maxLength:200,
        required: false,
    },
    graphGame:{
        type: String,
        maxLength: 200,
        required: false,
    },
},{versionKey: false});

module.exports = mongoose.model('Game', gameSchema)