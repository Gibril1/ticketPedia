import { Response } from 'express'
import { IGetUserAuthInfoRequest } from "../interfaces/AuthInterface"
const asyncHandler = require('express-async-handler')
const Events = require('../models/EventModel') 
import { IEvent } from '../models/EventModel'


// @desc Create Events
// @route /api/events/
// @access Private: Organizer
const createEvents = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {

    // checking for authorization
    if(req.user.role !== 'organizer' && !req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // destructuring body data
    const { name, 
            description, 
            location, 
            population ,
            date
    } = req.body as IEvent


    // checking to see if input fields is valid
    if(
        !name || name === '' || 
        !description || description === '' || 
        !location || location === '' || 
        !population || !date
        ){
        res.status(400)
        throw new Error('Invalid input fields')
    }

    // creating and committing into database
    const events = await Events.create({
        name: name,
        description: description,
        location: location,
        population: population,
        date: date,
        timeDuration: req.body.timeDuration ? req.body.timeDuration : null,
        organizerId: req.user._id
    })

    res.status(201).json(events)
    
})
const getEvent = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {

    // checking for authorization
    if(req.user.role !== 'organizer' && !req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // checking if that event exists
    const event = await Events.findById(req.params.id)

    if(!event){
        res.status(404)
        throw new Error(`Event with id ${req.params.id} does not exist`)
    }

    res.status(200).json(event)

})
const getEvents = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {

    // checking for authorization
    if(req.user.role !== 'organizer' && !req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // checking for the user's events
    const events = await Events.find({ organizerId: req.user._id})

    if(events.length === 0){
        res.status(200).json('You have no events. Create One')
    }

    res.status(200).json(events)

})
const updateEvent = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    // checking for authorization
    if(req.user.role !== 'organizer' && !req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // check if events exists
    const event = await Events.findById(req.params.id)

    if(!event){
        res.status(404)
        throw new Error(`Event with id ${req.params.id} does not exist`)
    }

    // checking if the user is authorized 
    if(event.organizerId.toString() !== req.user._id){
        res.status(400)
        throw new Error('You are not authorized to update this event')
    }

    const updatedEvent = await Events.findByIdAndUpdate(req.params.id, req.body, { new: true})

    res.status(200).json(updatedEvent)


})
const deleteEvent = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {

    // checking for authorization
    if(req.user.role !== 'organizer' && !req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // check if event exists
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

