const express = require('express')
const router = express.Router()

const {
    getRooms,
    getRoom,
    createRoom,
    editRoom,
    deleteRoom,
    getRoomByPassword
} = require('../controllers/RoomController')

router.get('/', getRooms)
router.get('/:room_id', getRoom)

router.post('/password', getRoomByPassword)
router.post('/', createRoom)

router.patch('/:room_id', editRoom)

router.delete('/:room_id', deleteRoom)

module.exports = router