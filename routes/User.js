const express = require('express')
const router = express.Router()

const {
    getUser,
    createUserIfNonExistent,
    editUser,
    deleteUser
} = require('../controllers/UserController')

router.get('/:user_id', getUser)

router.post('/', createUserIfNonExistent)

router.patch('/:user_id', editUser)

router.delete('/:user_id', deleteUser)

module.exports = router