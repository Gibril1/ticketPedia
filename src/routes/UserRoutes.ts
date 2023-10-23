import { Router } from "express"
const userRouter = Router()

import {
    buyTicket
} from '../controllers/UserControllers'

import { protect } from '../middleware/AuthMiddleware'

userRouter.post('/buy/:id', protect, buyTicket)

export {
    userRouter
}