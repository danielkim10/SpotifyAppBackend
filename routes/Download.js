const express=  require('express')
const router = express.Router()

const {
    getDownloadsUserRoom,
    createDownload,
    updateDownload,
    deleteDownload
} = require('../controllers/DownloadController')

router.get('/:user_id/:room_id', getDownloadsUserRoom)

router.post('/', createDownload)

router.patch('/:download_id', updateDownload)

router.delete('/:download_id', deleteDownload)

module.exports = router