const express = require('express')
const cookieParser = require('cookie-parser')

const router = express.Router()
router.use(cookieParser())

const {
  login,
  callback,
  refreshToken
} = require('../controllers/AuthorizationController')

router.get('/login', login)
router.get('/callback', callback)
router.get('/refresh_token', refreshToken)

module.exports = router