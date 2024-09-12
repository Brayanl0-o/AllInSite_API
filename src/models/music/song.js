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
    trackID: {
        type: String,
        required: false,
    },
    songImg: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: false,
    },
    genre: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 35
    },
    averageRating: {
        type: Number,
        min: 1,
        max: 10,
        required: false,
    },
    releaseDate: {
        type: Date,
        required: false,
    },
    lyrics:{
        type: String,
        maxLength: 5050,
        required: false,
    },
    linkToYoutube:{
        type: String,
        required: false,
    },
    linkToSpotify:{
        type: String,
        required: false,
    },
    linkToDeezer:{
        type: String,
        required: false,
    },
    category:{
        type: String,
        required: false,
        default: '',
    },

},{versionKey: false});

module.exports = mongoose.model('Song', songSchema)