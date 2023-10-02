const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    gameName: {
        type: String,
        require: true,
        maxLenth: 50
    },
    gameImg: {
        type: String,
        required: false
    },
    platform: {
        type: String,
        required: false,
        maxLenth: 30
    },
    releaseDate: {
        type: Date,
        required: false,
        maxLenth: 20
    },
    developer: {
        type: String,
        required: false,
        maxLenth: 40
    },
    genre: {
        type: String,
        required: false,
        maxLenth: 30
    },
    rating: {
        type: Number,
        required: false,

    }
});

module.exports = mongoose.model('Game', gameSchema)