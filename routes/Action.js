const express = require('express')
const router = express.Router()

const { 
    getActionsByRoom,
    createAction,
    deleteAction
} = require("../controllers/ActionController")

router.get('/:room_id', getActionsByRoom)

router.post('/', createAction)

router.delete('/:action_id', deleteAction)

module.exports = router