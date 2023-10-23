import { Response } from 'express'
import { IGetUserAuthInfoRequest } from '../interfaces/AuthInterface'
import asyncHandler from 'express-async-handler'
import { Ticket, Event, ITicket, IEvent } from '../models/index'


// @desc Create Ticket for an event
// @routes POST /api/tickets/:id
// @access Private: Organizer
const createTickets = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    // checking for authorization
    if(!req.user){
        res.status(400)
        throw new Error('Not authorized')
    }
    
    if(req.user.role !== 'organizer'){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // check if the event exists
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(404)
        throw new Error(`Event with id of ${req.params.id} does not exist`)
    }

    // check if the event organizer is the one creating tickets
    if(event.organizerId.toString() !== req.user._id?.toString()){
        res.status(400)
        throw new Error('You are not authorized to create tickets for this event')
    }

    // destructuring the request body
    const { price, category, totalTickets, availableTickets } = req.body as ITicket

    if(
        !price || !totalTickets || ! category
    ){
        res.status(400)
        throw new Error('Please enter fields')
    }

    const ticket = await Ticket.create({
        eventId: event._id,
        organizerId: req.user._id,
        price: price,
        category: category,
        totalTickets: totalTickets,
        availableTickets: availableTickets ? availableTickets : totalTickets
    }) as ITicket

    res.status(201).json(ticket)

})


// @desc Get All Tickets for the event
// @routes GET /api/tickets/:id
// @access Private: User
const getTickets = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    if(!req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // check if the event exists
    const event:IEvent = await Event.findById(req.params.id)

    if(!event){
        res.status(404)
        throw new Error(`Event with id of ${req.params.id} does not exist`)
    }

    const tickets:ITicket[] = await Ticket.find({ eventId: event._id })

    res.status(200).json(tickets)
})


// @desc Get A Ticket for the event
// @routes GET /api/tickets/:id
// @access Private: User
const getTicket = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    if(!req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // check if the tickets exists
    const ticket:ITicket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error(`Ticket with id of ${req.params.id} does not exist`)
    }

    res.status(200).json(ticket)
})
const updateTicket = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    // checking for authorization
    if(!req.user){
        res.status(400)
        throw new Error('Not authorized')
    }
    
    if(req.user.role !== 'organizer'){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // check if the ticket exists
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error(`Ticket with id of ${req.params.id} does not exist`)
    }

    // checking authorization
    if(ticket.organizerId.toString() !== req.user._id?.toString()){
        res.status(400)
        throw new Error('You are not authorized to update this event')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true})

    res.status(200).json(updatedTicket)


})
const deleteTicket = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    // checking for authorization
    if(!req.user){
        res.status(400)
        throw new Error('Not authorized')
    }
    
    if(req.user.role !== 'organizer'){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // check if the ticket exists
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error(`Ticket with id of ${req.params.id} does not exist`)
    }

    // checking authorization
    if(ticket.organizerId.toString() !== req.user._id){
        res.status(400)
        throw new Error('You are not authorized to update this event')
    }

    // await ticket.remove()

    res.status(204).json({ _id: req.params.id})

})

export {
    createTickets,
    getTicket,
    getTickets,
    updateTicket,
    deleteTicket
}


