const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomMember = require('./Member');

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    password: {
        type: String,
        required: false
    }
}, { timestamps: true })

roomSchema.pre("remove", (next) => {
    RoomMember.remove({ room: room._id }, next)
});

roomSchema.post("remove", () => {
    RoomMember.remove({ room: room._id }).exec();
});

module.exports = mongoose.model('Room', roomSchema)