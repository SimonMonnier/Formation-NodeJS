import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import {
    getRooms, getRoom
} from '../controllers/roomController.js'

import { catchErrors } from './../helpers.js'

//Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

router.get('/api', (_, res) => {
    res.send('Hello Simo !')
})

router.get('/api/rooms', catchErrors(getRooms))

router.get('/api/rooms/:id', catchErrors(getRoom))

//Authentification
router.post('/signup', passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup OK',
            user: req.user
        })
    }
)

router.post('/login', (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        try {
            if (err || !user) {
                const error = new Error('Une erreur est survenue.')
            }

            req.login(user, { session: false }, async error => {
                if (error) return next(error)

                const body = { _id: user._id , email: user.email }
                const token = jwt.sign({ user: body }, '0123456789')

                res.json({ token })
            })
        } catch (error) {
            return next(error)
        }
    })(req, res, next) //<<==== Auto appel de la fonction
})

router.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
  
export default router