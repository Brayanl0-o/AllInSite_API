const mongoose = require('mongoose')

const Schema = mongoose.Schema

const songSchema = new Schema({
    songName: {
        type: String,
        required: true,
        minLength:4,   
        maxLength: 80,
    },
    singer: {
        type: String,
        required: true,
        minLength:4,   
        maxLength: 80,
    },
    songImg: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 35
    },
    averageRating: {
        type: Number,
        minLength: 1,
        maxLength: 2,
        required: false,
    },
    releaseDate: {
        type: Date,
        required: false,
    },
    lyrics:{
        type: String,
        maxLength: 2050,
        required: false,
    },

},{versionKey: false});

module.exports = mongoose.model('Song', songSchema)