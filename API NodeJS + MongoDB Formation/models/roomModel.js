import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //enleve les espaces de fin
        lowercase: true
    },
    maxPersons: {
        type: Number,
        default: 1,
        validate: value => {
            if (value <= 0) {
                throw new Error('La chambre doit pouvoir accueillir au moins une personne.')
            }
        }
    }
})

const RoomModel = mongoose.model('Room', RoomSchema)

export default RoomModel