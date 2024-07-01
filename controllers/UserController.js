const mongoose = require('mongoose')
const User = require('../models/User')

const getUser = async(req, res) => {
    const { user_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: `No user with id ${user_id}`})
    }

    const user = await User.findById(user_id)

    if (!user) {
        return res.status(404).json({
            error: `No user with id ${user_id}`
        })
    }

    res.status(200).json(user)
}

const getUserBySpotifyID = async(req, res) => {
    const { spotify_id } = req.params
    const user = await User.findOne({ spotify_id: spotify_id })

    if (!user) {
        return res.status(404).json({
            error: `No user with spotify id ${spotify_id}`
        })
    }

    res.status(200).json({ items: user, message: "User found" })
}

const createUser = async(req, res) => {
    
}

const createUserIfNonExistent = async(req, res) => {
    const { spotify_id } = req.body
    const user = await User.findOne({ spotify_id: spotify_id })
    if (!user) {
        const { name, spotify_id } = req.body
        try {
            const user1 = await User.create({ name, spotify_id })
            res.status(200).json({ items: user1, message: `User created with id ${user1._id}` })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    else {
        res.status(200).json({ items: user, message: `User found with id ${user._id}` })
    }
}

const editUser = async(req, res) => {
    const { user_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: `No user with id ${user_id}`})
    }
}

const deleteUser = async(req, res) => {
    const { user_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: `No user with id ${user_id}`})
    }
}

module.exports = {
    getUser,
    getUserBySpotifyID,
    createUser,
    createUserIfNonExistent,
    editUser,
    deleteUser
}