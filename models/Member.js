const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastAccessTime: {
        type: Schema.Types.Date,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Member', memberSchema)