const mongoose = require('mongoose')
const Playlist = require('../models/Playlist')
const Track = require('../models/Track')

const getTracksInPlaylist = async(req, res) => {
    const { playlist_id } = req.params
    const page = req.query.page
    const limit = 10

    const playlist = await Playlist.findById(playlist_id)

    if (!playlist) {
        return res.status(404).json({error: `No playlist with id ${playlist_id}`})
    }

    const tracks = await Track.find({playlist: playlist._id}).skip(page * limit).limit(limit);
    res.status(200).json({items: tracks, message: `Returned tracks in playlist ${playlist._id}`})
}

const createTrack = async(req, res) => {
    const { ids } = req.body

    const playlist = await Playlist.findById(ids[0].playlist)

    if (!playlist) {
        return res.status(404).json({error: `No playlist with id ${ids[0].playlist}`})
    }

    Track.insertMany(ids).then(items => {
        res.status(200).json({items: items, message: `Created ${items.length} tracks`})
    }).catch(error => {
        res.status(400).json({ error: error.message })
    });
}

const editTrack = async(req, res) => {
    const { track_id } = req.params
    if (!mongoose.Types.ObjectId.isValid(track_id)) {
        return res.status(404).json({error: `No track with id ${track_id}`})
    }

    const track = await Track.findOneAndUpdate({_id: track_id}, {
        ...req.body
    })

    if (!track) {
        return res.status(404).json({error: 'Track does not exist'})
    }

    res.status(200).json(track)
}

const deleteTrack = async(req, res) => {
    const { track_id } = req.params

    const track = await Track.findOneAndDelete({spotify_id: track_id})

    if (!track) {
        return res.status(404).json({error: 'Track does not exist'})
    }

    res.status(200).json(track)
}

module.exports = {
    getTracksInPlaylist,
    createTrack,
    editTrack,
    deleteTrack
}