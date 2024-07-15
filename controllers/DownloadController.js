const mongoose = require('mongoose')
const Download = require('../models/Download')
const Playlist = require('../models/Playlist')
const Room = require('../models/Room')
const User = require('../models/User')

const getDownloadsUserRoom = async(req, res) => {
    const { user_id, playlist_ids } = req.params

    const playlistIDs = playlist_ids.split(",")
    console.log(playlistIDs)

    // const room = await Room.findById(room_id)
    const user = await User.findById(user_id)

    if (!user) {
        return res.status(404).json({ error: `Missing entities` })
    }

    const downloads = await Download.find({ user_id: user._id, playlist_id: { $in: playlistIDs } })
    res.status(200).json({items: downloads, message: `Downloads found for user ${user._id}`})
}

const createDownload = async(req, res) => {
    const { user_id, playlist_id, snapshot_id } = req.body

    const playlist = await Playlist.findById(playlist_id)
    const user = await User.findById(user_id)

    if (!user || !playlist) {
        return res.status(404).json({ error: `Missing entities` })
    }

    try {
        let download = await Download.create({ user_id, playlist_id, snapshot_id })
        res.status(200).json({ items: download, message: `Created download wtih id ${download._id}`})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateDownload = async(req, res) => {
    const { download_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(download_id)) {
        return res.status(404).json({ error: `No downloaded playlist with id ${download_id}` })
    }

    const record = await DownloadedPlaylist.findOneAndUpdate({_id: download_id}, {
        ...req.body
    }, { new: true })

    if (!record) {
        return res.status(404).json({ error: `Record does not exist`})
    }

    res.status(200).json(record)
}

const deleteDownload = async(req, res) => {
    const { download_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(download_id)) {
        return res.status(404).json({error: `No playlist with id ${download_id}`})
    }

    const record = await DownloadedPlaylist.findOneAndDelete({_id: download_id})
    if (!record) {
        return res.status(404).json({error: 'Record does not exist'})
    }

    res.status(200).json(record)
}

module.exports = {
    getDownloadsUserRoom,
    createDownload,
    updateDownload,
    deleteDownload
}