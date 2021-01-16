import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

//Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true, //enleve les espaces de fin
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Pré Hook - Avant d'enregistrer dans MongoDb
UserSchema.pre('save', async function (next) {
    const user = this

    const hash = await bcrypt.hash(user.password, 10)

    user.password = hash

    next()
})

//Ajouter une méthode pour vérifier le password
UserSchema.methods.isValidPassword = async function (password){
    const user = this

    const isSame = await bcrypt.compare(password, user.password)

    return isSame  // retourne true ou false
}

const UserModel = mongoose.model('User', UserSchema)

export default UserModel