const mongoose = require('mongoose')

const Schema = mongoose.Schema
const gameRequirementsSchema = new Schema({
    gameId: { 
        type: Schema.Types.ObjectId,
        ref: 'Game',
        requierd: true,
    },
    platform: {
        type: String,
        required: false,
        maxLength: 60
    },
    sizeGame:{
        type: Number,
        maxLength: 5,
        required: false,
        default: '0'
    },
    ramGame:{
        type: Number,
        maxLength: 3,
        required: false,
        default: '0'
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
},{versionKey: false});

module.exports = mongoose.model('gameRequirements', gameRequirementsSchema)