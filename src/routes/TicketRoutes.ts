import { Router } from 'express'
const ticketRouter = Router()
import { protect } from '../middleware/AuthMiddleware'

import {
    createTickets,
    getTicket,
    getTickets,
    updateTicket,
    deleteTicket
} from '../controllers/TicketControllers'

ticketRouter.route('/:id')
            .post(protect, createTickets)
            .get(protect, getTickets)
            .put(protect, updateTicket)
            .delete(protect, deleteTicket)

ticketRouter.get('/single/:id', protect, getTicket)



export {
    ticketRouter
}