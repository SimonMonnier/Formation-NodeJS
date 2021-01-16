import RoomModel from '../models/roomModel.js'


//Add a room
export const addRoom = async (req, res) => {
    const room = new RoomModel(req.body)
    await room.save()
    res.send(room)
}

//Read all rooms
export const getRooms = async (_, res) => {
    const rooms = await RoomModel.find({})
    res.send(rooms)
}

//Read one room
export const getRoom = async (req, res) => {
    const rooms = await RoomModel.find({_id: req.params.id})
    res.send(rooms[0])
}

//Update
export const updateRoom = async (req, res) => {
    const room = await RoomModel.findByIdAndUpdate(req.params.id, req.body)
    await room.save()
    res.send(room)
}

//Delete
export const deleteRoom = async (req, res) => {
    const room = await RoomModel.findByIdAndDelete(req.params.id)
    if (!room) res.status(404).send('Aucune chambre trouvé !')
    res.status(200).send()
}