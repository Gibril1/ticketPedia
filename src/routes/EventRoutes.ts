import { Router } from 'express'
const eventRouter = Router()

import {
    createEvents,
    getEvent,
    getEvents,
    updateEvent,
    deleteEvent
}from '../controllers/EventControllers'

import { protect } from '../middleware/AuthMiddleware'

eventRouter.route('/')
        .post(protect, createEvents)
        .get(protect, getEvents)

eventRouter.route('/:id')
        .get(protect, getEvent)
        .put(protect, updateEvent)
        .delete(protect, deleteEvent)



export {
        eventRouter
}