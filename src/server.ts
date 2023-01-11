import express from 'express'
require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/ErrorMiddleware')


// Init app
const app = express()

// Connect DB
connectDB()


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(errorHandler)


// routes
app.use('/api/auth', require('./routes/AuthRoutes'))
app.use('/api/events', require('./routes/EventRoutes'))
app.use('/api/tickets', require('./routes/TicketRoutes'))
app.use('/api/user', require('./routes/UserRoutes'))

// Listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})