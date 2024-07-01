const mongoose = require('mongoose')
const Schema = mongoose.Schema

const actionSchema = new Schema({
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    objects: {
        type: [String]
    },
    stringTemplate: {
        type: Number,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Action', actionSchema)