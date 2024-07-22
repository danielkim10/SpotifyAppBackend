module.exports = (io, socket) => {
    const createPlaylist = (data, roomID) => {
        io.to(roomID).emit("server:create-playlist", data)
    }

    const editPlaylist = (data, roomID) => {
        io.to(roomID).emit("server:edit-playlist", data, roomID)
    }

    const deletePlaylist = (data, roomID) => {
        io.to(roomID).emit("server:delete-playlist", data)
    }

    const sharePlaylist = (data, roomID) => {
        io.to(roomID).emit("server:share-playlist", data)
    }

    const hidePlaylist =(data, roomID) => {
        io.to(roomID).emit("server:hide-playlist", data)
    }

    const trackAddedToPlaylist = (data, roomID) => {
        io.to(roomID).emit("server:add-track-to-playlist", data)
    }

    const trackRemovedFromPlaylist = (data, roomID) => {
        io.to(roomID).emit("server:remove-track-from-playlist", data)
    }

    const userEditingPlaylist = (data, roomID) => {
        io.to(roomID).emit("server:user-editing-playlist", data)
    }

    const userStopEditingPlaylist = (data, roomID) => {
        io.to(roomID).emit("server:user-stop-editing-playlist", data)
    }

    const roomDeleted = (roomID) => {
        io.to(roomID).emit("server:room-deleted")
    }

    const playlistDownloaded = (data, roomID) => {
        io.to(roomID).emit("server:playlist-downloaded", data)
    }

    socket.on("client:create-playlist", createPlaylist)
    socket.on("client:edit-playlist", editPlaylist)
    socket.on("client:delete-playlist", deletePlaylist)
    socket.on("client:share-playlist", sharePlaylist)
    socket.on("client:hide-playlist", hidePlaylist)
    socket.on("client:track-added-to-playlist", trackAddedToPlaylist)
    socket.on("client:track-removed-from-playlist", trackRemovedFromPlaylist)

    socket.on("client:user-editing-playlist", userEditingPlaylist)
    socket.on("client-user-stop-editing-playlist", userStopEditingPlaylist)
    socket.on("client:delete-room", roomDeleted)
    socket.on("client:playlist-downloaded", playlistDownloaded)
}