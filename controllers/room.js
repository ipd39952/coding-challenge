const { Room } = require('../models')

const getRooms = async (req, res) => {
  try {
    const allRooms = await Room.findAll()
    res.json(allRooms)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const getRoom = async (req, res) => {
  const id = req.params.id
  try {
    const room = await Room.findOne({ where: { id } })
    if (!room) {
      return res.status(500).json({ message: 'No room with such ID found' })
    }
    res.status(200).json(room)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

module.exports = { getRoom, getRooms }
