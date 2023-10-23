import { Router } from 'express'
const authRouter = Router()

import {
    loginUser,
    registerUser
} from '../controllers/AuthControllers'



authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)




export {
    authRouter
}
