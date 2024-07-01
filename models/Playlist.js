const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema({
    spotify_id: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tracks: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ""
    },
    hidden: {
        type: Boolean,
        default: false
    },
    lastUpdateTime: {
        type: Date
    },
    lastUpdateUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Playlist', playlistSchema)