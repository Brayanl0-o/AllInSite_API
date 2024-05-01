const mongoose = require('mongoose')

const Schema = mongoose.Schema
const gameRequirementsSchema = new Schema({
    gameId: { 
        type: Schema.Types.ObjectId,
        ref: 'Game',
        requierd: true,
    },
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
},{versionKey: false});

module.exports = mongoose.model('gameRequirements', gameRequirementsSchema)