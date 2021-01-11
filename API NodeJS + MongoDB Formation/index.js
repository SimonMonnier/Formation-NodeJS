import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import dotenv from 'dotenv'

//Lancement de dotenv
dotenv.config()

const PORT = process.env.PORT || 4444

const app = express()

//connection à la base de donnée
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port ${PORT}.`)
})