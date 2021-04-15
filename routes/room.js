const express = require('express')
const router = express.Router()
const { getRoom, getRooms } = require('../controllers/room')

router.get('/', getRooms)
router.get('/:id', getRoom)

module.exports = router
