import express from 'express'
require('dotenv').config()
const port = process.env.PORT || 5000
import { connectDB } from './config/db'
import { errorHandler } from './middleware/ErrorMiddleware'
import { authRouter, eventRouter, ticketRouter, userRouter } from './routes'


// Init app
const app = express()

// Connect DB
connectDB()



// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(errorHandler)


// routes
app.use('/api/auth', authRouter)
app.use('/api/events', eventRouter)
app.use('/api/tickets', ticketRouter)
app.use('/api/users', userRouter)

// Listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})