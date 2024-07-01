const express = require('express')
const router = express.Router()

const {
    getPlaylistsInRoom,
    createPlaylist,
    editPlaylist,
    deletePlaylist
} = require('../controllers/PlaylistController');

router.get('/:room_id', getPlaylistsInRoom)

router.post('/', createPlaylist)

router.patch('/:playlist_id', editPlaylist)

router.delete('/:playlist_id', deletePlaylist)

module.exports = router