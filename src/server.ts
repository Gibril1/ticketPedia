const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000

// Init app
const app = express()


// Listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})