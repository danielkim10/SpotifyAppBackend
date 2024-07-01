const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trackSchema = new Schema({
    spotify_id: {
        type: String,
        required: true
    },
    uri: {
        type: String,
        required: true
    },
    playlist: {
        type: Schema.Types.ObjectId,
        ref: 'Playlist',
        required: true
    },
    order: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Track', trackSchema)