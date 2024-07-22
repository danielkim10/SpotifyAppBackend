const express = require('express')
const router = express.Router()

const {
    getPlaylistsInRoom,
    createPlaylist,
    editPlaylist,
    updatePlaylistTrackCount,
    deletePlaylist
} = require('../controllers/PlaylistController');

router.get('/:room_id', getPlaylistsInRoom)

router.post('/', createPlaylist)

router.patch('/:playlist_id', editPlaylist)

router.patch('/update_count/:playlist_id', updatePlaylistTrackCount)

router.delete('/:playlist_id', deletePlaylist)

module.exports = router