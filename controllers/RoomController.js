const mongoose = require('mongoose')
const Room = require('../models/Room')
const User = require('../models/User')

const getRooms = async(req, res) => {
    const rooms = await Room.find().populate('owner').then(r => {
        res.status(200).json(r)
    }).catch(error => console.log(error))
}

const getRoom = async(req, res) => {
    const { room_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(room_id)) {
        return res.status(404).json({error: `No room with id ${room_id}`})
    }

    const room = await Room.findById(room_id).populate('owner')

    if (!room) {
        return res.status(404).json({
            error: `No room with id ${room_id}`
        })
    }

    res.status(200).json(room)
}

const getRoomByPassword = async(req,res) => {
    const { password } = req.body
    const room = await Room.findOne({password: password}).populate('owner')

    if (!room) {
        return res.status(404).json({
            error: `No room found`
        })
    }

    res.status(200).json(room)
}

const createRoom = async(req, res) => {
    const { name, description, owner, password, maxUsers } = req.body
    const user = await User.findById(owner)
    
    if (!user) {
        return res.status(404).json({error: `No user with id ${owner}`})
    }

    try {
        const room = await Room.create({ name, description, owner: user._id, password, maxUsers })
        res.status(200).json({ items: room, message: `Room created with id ${room._id}`})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const editRoom = async(req, res) => {
    const { room_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(room_id)) {
        return res.status(404).json({error: `No room with id ${room_id}`})
    }

    const room = await Room.findOneAndUpdate({_id: room_id}, {
        ...req.body
    })

    if (!room) {
        return res.status(404).json({error: 'Playlist does not exist'})
    }

    res.status(200).json(room)
}

const deleteRoom = async(req, res) => {
    const { room_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(room_id)) {
        return res.status(404).json({error: `No room with id ${room_id}`})
    }

    const room = await Room.findOneAndDelete({_id: room_id})

    if (!room) {
        return res.status(404).json({error: 'Room does not exist'})
    }

    res.status(200).json(room)
}

module.exports = {
    getRooms,
    getRoom,
    getRoomByPassword,
    createRoom,
    editRoom,
    deleteRoom
}