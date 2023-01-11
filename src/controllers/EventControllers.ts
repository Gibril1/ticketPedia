import { Response } from 'express'
import { IGetUserAuthInfoRequest } from "../interfaces/AuthInterface"
const asyncHandler = require('express-async-handler')
const Events = require('../models/EventModel')


// @desc Create Events
// @route /api/events/
// @access Private: Organizer
const createEvents = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    if(!req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    if(req.user.role !== 'organizer'){
        res.status(400)
        throw new Error('You are not authorized to create events')
    }

    const { name, description } = req.body

    if(!name || name === '' || !description || description === ''){
        res.status(400)
        throw new Error('Invalid input fields')
    }

    const events = await Events.create({
        name: name,
        description: description,
        organizerId: req.user._id
    })

    res.status(201).json(events)
    
})
const getEvent = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    if(!req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    if(req.user.role !== 'organizer'){
        res.status(400)
        throw new Error('You are not authorized to create events')
    }

    const event = await Events.findById(req.params.id)

    if(!event){
        res.status(404)
        throw new Error(`Event with id ${req.params.id} does not exist`)
    }

    res.status(200).json(event)

})
const getEvents = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    if(!req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    if(req.user.role !== 'organizer'){
        res.status(400)
        throw new Error('You are not authorized to create events')
    }

    const events = await Events.find({ organizerId: req.user._id})

    if(events.length === 0){
        res.status(200).json('You have no events. Create One')
    }

    res.status(200).json(events)

})
const updateEvent = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    if(!req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    if(req.user.role !== 'organizer'){
        res.status(400)
        throw new Error('You are not authorized to create events')
    }

    const event = await Events.findById(req.params.id)

    if(!event){
        res.status(404)
        throw new Error(`Event with id ${req.params.id} does not exist`)
    }

    if(event.organizerId.toString() !== req.user._id){
        res.status(400)
        throw new Error('You are not authorized to update this event')
    }

    const updatedEvent = await Events.findByIdAndUpdate(req.params.id, req.body, { new: true})

    res.status(200).json(updatedEvent)


})
const deleteEvent = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    if(!req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    if(req.user.role !== 'organizer'){
        res.status(400)
        throw new Error('You are not authorized to create events')
    }

    const event = await Events.findById(req.params.id)

    if(!event){
        res.status(404)
        throw new Error(`Event with id ${req.params.id} does not exist`)
    }

    if(event.organizerId.toString() !== req.user._id){
        res.status(400)
        throw new Error('You are not authorized to update this event')
    }

    await event.remove()

    res.status(204).json({ _id: req.params._id })

})

module.exports = {
    createEvents,
    getEvent,
    getEvents,
    updateEvent,
    deleteEvent
}

