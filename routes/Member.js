const express = require('express')
const router = express.Router()

const {
    getMembersByRoom,
    getMembersByUser,
    createMember,
    deleteMember,
    deleteMemberByUser,
    deleteMembers
} = require('../controllers/MemberController')

router.get('/room/:room_id', getMembersByRoom)
router.get('/user/:user_id', getMembersByUser)

router.post('/', createMember)

router.delete('/:member_id', deleteMember)

router.delete('/user/:user_id/room/:room_id', deleteMemberByUser)

router.delete('/room/:room_id', deleteMembers)

module.exports = router