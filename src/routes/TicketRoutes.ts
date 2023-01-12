const router = require("express").Router()
const { protect } = require('../middleware/AuthMiddleware')

const {
    createTickets,
    getTicket,
    getTickets,
    updateTicket,
    deleteTicket
} = require('../controllers/TicketControllers')

router.route('/:id')
            .post(protect, createTickets)
            .get(protect, getTickets)
            .put(protect, updateTicket)
            .delete(protect, deleteTicket)

router.get('/single/:id', protect, getTicket)

module.exports = router

export {}