const mongoose = require('mongoose')

const Schema = mongoose.Schema
const gameRequirementsSchema = new Schema({
    game: { 
        type: Schema.Types.ObjectId,
        ref: 'Game',
        requierd: true,
    },
    platform: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 60
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

module.exports = mongoose.model('gameRequirements', gameRequirementsSchema)