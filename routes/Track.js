const express = require('express')
const router = express.Router()

const {
    getTracksInPlaylist,
    createTrack,
    editTrack,
    deleteTrack
} = require('../controllers/TrackController');

router.get('/:playlist_id', getTracksInPlaylist)

router.post('/', createTrack)

router.patch('/:track_id', editTrack)

router.delete('/:track_id', deleteTrack)

module.exports = router