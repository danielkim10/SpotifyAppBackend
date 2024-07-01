module.exports = (io, socket) => {
    const sendMessage = (data, roomID) => {
        io.to(roomID).emit('server:receive-message', data)
    }

    const userJoinRoom = (data) => {
        io.to(roomID).emit('server:user-joined', data)
    }

    const userLeaveRoom = (data) => {
        io.to(roomID).emit('server:user-left', data)
    }

    socket.on("client:send-message", sendMessage)
    socket.on("client:user-join-room", userJoinRoom)
    socket.on("client:user-leave-room", userLeaveRoom)
}