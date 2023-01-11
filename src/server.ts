import express from 'express'
require('dotenv').config()
const port = process.env.PORT || 5000

// Init app
const app = express()


// routes
app.use('/api/auth', require('./routes/AuthRoutes'))
app.use('/api/events', require('./routes/EventRoutes'))

// Listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})