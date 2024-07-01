const mongoose = require('mongoose')
const Member = require('../models/Member')
const Room = require('../models/Room')
const User = require('../models/User')

const getMembersByRoom = async (req, res) => {
    const { room_id } = req.params

    const room = await Room.findById(room_id)

    if (!room) {
        return res.status(404).json({error: `Room does not exist with id ${room_id}`})
    }

    const members = await Member.find({room: room._id}).populate('user')
    res.status(200).json({items: members, message: `Returned members of room ${room._id}`})
}

const getMembersByUser = async(req, res) => {
    const { user_id } = req.params

    const user = await User.findById(user_id)

    if (!user) {
        return res.status(404).json({error: `User does not exist with id ${user_id}`})
    }

    const rooms = await Member.find({user: user._id}).populate('room').populate('user')
    res.status(200).json({items: rooms, message: `Returned rooms for user ${user._id}`})
}

const createMember = async (req, res) => {
    const { roomID, userID, lastAccessTime } = req.body
    
    const room = await Room.findById(roomID)
    const user = await User.findById(userID)

    if (!room || !user) {
        return res.status(404).json({error: `Missing entries`})
    }

    const existingMember = await Member.findOneAndUpdate({room: room._id, user: user._id}, {
        ...req.body
    })

    if (existingMember) {
        return res.status(200).json({ items: existingMember, message: `Member found and updated` })
    }

    try {
        const member = await Member.create({room: room._id, user: user._id, lastAccessTime })
        res.status(200).json({ items: member, message: `Room member created with id ${member._id}`})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteMember = async (req, res) => {
    const { member_id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(member_id)) {
        return res.status(404).json({error: `No entry with id ${member_id}`})
    }

    const member = await RoomMember.findOneAndDelete({_id: member_id})
    if (!member) {
        return res.status(404).json({error: 'Member does not exist'})
    }

    res.status(200).json(member)
}

module.exports = {
    getMembersByRoom,
    getMembersByUser,
    createMember,
    deleteMember
}