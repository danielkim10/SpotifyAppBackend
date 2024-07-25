module.exports = (io, socket) => {
    const joinRoom = (roomID) => {
        socket.join(roomID);
        console.log(`${socket.id} user joined room ${roomID}`)
        io.to(roomID).emit('server:join-room', roomID)
    }

    const leaveRoom = (roomID) => {
        socket.leave(roomID)
        // io.to(roomID).emit('server:leave-room', roomID)
        console.log(`${socket.id} user left room ${roomID}`)
    }

    const deleteRoom = () => {
        io.to(roomID).emit('server:room-deleted', roomID)
    }
    
    const disconnect = () => {
        console.log('User disconnected')
    }

    socket.on("client:join-room", joinRoom)
    socket.on("client:leave-room", leaveRoom)
    socket.on("disconnect", disconnect)
}