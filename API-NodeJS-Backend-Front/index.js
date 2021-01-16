import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import privateRoutes from './routes/privateRoutes.js'
import passport from 'passport'
import dotenv from 'dotenv'
import './auth/auth.js'

//Lancement de dotenv
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

//connection à la base de donnée
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.use(express.json())

app.use(express.static('client/build'))

app.use('/private', passport.authenticate('jwt', { session: false }),
privateRoutes
)

app.use(routes)

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port ${PORT}.`)
})