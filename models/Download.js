const mongoose = require('mongoose')
const Schema = mongoose.Schema

const downloadSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    playlist_id: {
        type: Schema.Types.ObjectId,
        ref: 'Playlist',
        required: true
    },
    snapshot_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Download', downloadSchema)