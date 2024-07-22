const mongoose = require('mongoose')
const Playlist = require('../models/Playlist')
const Room = require('../models/Room')
const User = require('../models/User')

const getPlaylistsInRoom = async(req, res) => {
    const { room_id } = req.params
    
    const room = await Room.findById(room_id)

    if (!room) {
        return res.status(404).json({ error: `No room with id ${room_id}` })
    }

    const playlists = await Playlist.find({ room: room._id }).populate("room").populate("owner")
    res.status(200).json({items: playlists, message: `Playlists found for room ${room._id}`})
}

const createPlaylist = async(req, res) => {
    const { name, description, roomID, userID, hidden } = req.body

    const room = await Room.findById(roomID)
    const user = await User.findById(userID)

    if (!room || !user) {
        return res.status(404).json({ error: `Missing entries` })
    }

    try {
        let playlist = await Playlist.create({name, description, room: roomID, owner: userID, hidden})
        await (await playlist.populate("owner")).populate("room")
        res.status(200).json({ items: playlist, message: `Created playlist with id ${playlist._id}` })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const editPlaylist = async(req, res) => {
    const { playlist_id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(playlist_id)) {
        return res.status(404).json({error: `No playlist with id ${playlist_id}`})
    }

    const playlist = await Playlist.findOneAndUpdate({_id: playlist_id}, {
        ...req.body
    }, {new: true})

    if (!playlist) {
        return res.status(404).json({error: 'Playlist does not exist'})
    }
    
    await (await playlist.populate("owner")).populate("room")
    res.status(200).json(playlist)
}

const updatePlaylistTrackCount = async(req, res) => {
    const { playlist_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(playlist_id)) {
        return res.status(404).json({error: `No playlist with id ${playlist_id}`})
    }

    const playlist = await Playlist.findOneAndUpdate({_id: playlist_id}, {
        tracks: parseInt(req.body.tracks)
    }, {new: true})

    await (await playlist.populate("owner")).populate("room")
    res.status(200).json(playlist)
}

const deletePlaylist = async(req, res) => {
    const { playlist_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(playlist_id)) {
        return res.status(404).json({error: `No playlist with id ${playlist_id}`})
    }

    const playlist = await Playlist.findOneAndDelete({_id: playlist_id})

    if (!playlist) {
        return res.status(404).json({error: 'Playlist does not exist'})
    }

    res.status(200).json(playlist)
}

module.exports = {
    getPlaylistsInRoom,
    createPlaylist,
    editPlaylist,
    updatePlaylistTrackCount,
    deletePlaylist
}