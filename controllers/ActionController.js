const mongoose = require('mongoose')
const Action = require('../models/Action')
const Room = require('../models/Room')

const getActionsByRoom = async (req, res) => {
    const { room_id } = req.params

    const room = await Room.findById(room_id)

    if (!room) {
        return res.status(404).json({error: `Room does not exist with id ${room_id}`})
    }

    const actions = await Action.find({room: room._id}).populate('users').populate('room')
    res.status(200).json({items: actions, message: `Returned actions for room ${room._id}`})
}

const createAction = async (req, res) => {
    const { users, objects, stringTemplate, room } = req.body

    // string template 1: {user} has joined the room for the first time.
    // string template : {user} has changed the room name to '{object1}'
    // string template 2: {user} has generated a new room code.
    // string template 3: {user} has created a new playlist '{object1}'
    // string template 4: {user} has deleted a playlist '{object1}'
    // string template 5: {user} has renamed a playlist '{object1}' to '{object2}'
    // string template 6: {user} has changed details on a playlist '{object1}'
    // string template 7: {user} has shared their playlist '{object1}'
    // string template : {user} has added a track '{object1}' to playlist '{object2}'
    // string template : {user} has removed a track '{object1}' from playlist '{object2}'
    // string template : {user} has banned user {user}

    try {
        const action = await Action.create({users, objects, stringTemplate, room})
        return res.status(200).json({ items: action, message: `Action created with id ${action._id}`})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const deleteAction = async (req, res) => {
    const { action_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(action_id)) {
        return res.status(404).json({error: `No entry with id ${action_id}`})
    }

    const action = await Action.findOneAndDelete({_id: action_id})
    
    if (!action) {
        return res.status(404).json({error: 'Action does not exist'})
    }

    res.status(200).json(action)
}

module.exports = {
    getActionsByRoom,
    createAction,
    deleteAction
}