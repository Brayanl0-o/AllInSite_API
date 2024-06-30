const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    gameName: {
        type: String,
        required: true,
        minLength:4,   
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
    linkToBuy:{
        type: String,
        required: false,
    },
    linkToFree:{
        type: String,
        required: false,
    },
    requirements:{
        sizeGame:{
            value: { 
                type: Number, 
                maxLength: 4,
                default: '0'
            },
            
            unit: { 
                type: String, 
                enum: ['KB','MB', 'GB', 'TB'], 
            }
        },
        ramGame:{
            value: { 
                type: Number, 
                maxLength: 3,
                default: '0'
            },
            
            unit: { 
                type: String, 
                enum: ['MB', 'GB'], 
            }
        },
        processorGame:{
            type: String,
            maxLength:200,
            required: false,
            default: 'No añadido'
        },
        graphGame:{
            type: String,
            maxLength: 200,
            required: false,
            default: 'No añadido'
        },
    }

},{versionKey: false});

module.exports = mongoose.model('Game', gameSchema)