const router = require('express').Router()

const {
    buyTicket
} = require('../controllers/UserControllers')

const { protect } = require('../middleware/AuthMiddleware')

router.post('/buy/:id', protect, buyTicket)

module.exports = router