import express from 'express'
import {
    addRoom, updateRoom, deleteRoom
} from '../controllers/roomController.js'

import { catchErrors } from './../helpers.js'

const router = express.Router()

router.post('/api/rooms', catchErrors(addRoom))

router.patch('/api/rooms/:id', catchErrors(updateRoom))

router.delete('/api/rooms/:id', catchErrors(deleteRoom))

router.get('/secret', (req, res) => {
    res.json({
        message: 'ahah tu est connecté au secret',
        user: req.user,
        token: req.query.token
    })
})

export default router