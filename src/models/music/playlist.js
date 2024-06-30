const mongoose = require('mongoose')

const Schema = mongoose.Schema

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{versionKey: false,timestamps: true});
module.exports = mongoose.model('Playlist', playlistSchema)
