const express = require('express')
const router = express.Router()

const {
    getMembersByRoom,
    getMembersByUser,
    createMember,
    deleteMember
} = require('../controllers/MemberController')

router.get('/room/:room_id', getMembersByRoom)
router.get('/user/:user_id', getMembersByUser)

router.post('/', createMember)

router.delete('/:member_id', deleteMember)

module.exports = router