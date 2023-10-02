const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    gameName: {
        type: String,
        required: true,
        maxLength: 50
    },
    gameImg: {
        type: String,
        required: false
    },
    platform: {
        type: String,
        required: false,
        maxLength: 30
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

    }
});

module.exports = mongoose.model('Game', gameSchema)