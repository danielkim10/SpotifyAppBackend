require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const actionRoutes = require('./routes/Action')
const authorizationRoutes = require('./routes/Authorization')
const downloadRoutes = require('./routes/Download')
const memberRoutes = require('./routes/Member')
const playlistRoutes = require('./routes/Playlist')
const roomRoutes = require('./routes/Room')
const trackRoutes = require('./routes/Track')
const userRoutes = require('./routes/User')

const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const actionHandler = require('./socket/ActionHandler')
const chatHandler = require('./socket/ChatHandler')
const generalHandler = require('./socket/GeneralHandler')

// middleware section
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))
app.use(cookieParser())
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept')
    next()
})
app.use(cors())

// routes section
app.use('/api/auth', authorizationRoutes)
app.use('/api/action', actionRoutes)
app.use('/api/download', downloadRoutes)
app.use('/api/member', memberRoutes)
app.use('/api/playlist', playlistRoutes)
app.use('/api/room', roomRoutes)
app.use('/api/track', trackRoutes)
app.use('/api/user', userRoutes)

// socket section
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})

socketIO.on('connection', (socket) => {
    console.log("Phantom connection")
    console.log(`${socket.id} user connected`)

    actionHandler(socketIO, socket)
    chatHandler(socketIO, socket)
    generalHandler(socketIO, socket)
})

// DB section
mongoose.connect(process.env.MONGODB).then(() => { console.log('successful connection to db') }).catch((error) => { console.log(error) })

// start server
http.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})