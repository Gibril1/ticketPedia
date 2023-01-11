import { Response } from "express"
import { IGetUserAuthInfoRequest } from "../interfaces/AuthInterface"
const asyncHandler = require('express-async-handler')
const Ticket = require('../models/TicketsModel')
const Event = require('../models/EventModel')
const Payment = require('../models/PaymentModel')
const UserTickets = require('../models/UserTicketsModel')

const buyTicket = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {
    if(!req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    // check if the ticket exist
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error(`Tickets with id ${req.params.id} does not exist`)
    }

    // check if that particular event exists
    const event = await Event.findById(ticket.eventId)

    if(!event){
        res.status(404)
        throw new Error(`Event with id ${ticket.eventId} does not exist`)
    }

    // check if ticket is sold out
    if(ticket.availableTickets === 0){
        res.status(200).json('These ticket is sold out')
    }

    // getting the amount
    const { amount } = req.body 

    // checking if the exact amount has been paid
    if(!amount && amount !== ticket.price){
        res.status(400)
        throw new Error('Kindly make sure you have paid the right amount')
    }

    const payment = await Payment.create({
        ticketId: ticket._id,
        userId: req.user._id,
        eventId: event._id,
        amount: amount
    })

    let paymentMade
    // buy the tickets
    if(payment){
        paymentMade = await UserTickets.create({
            userId: req.user._id,
            paymentId: payment._id
        })
    }

    if(payment && paymentMade){
        res.status(200).json('Check your email. You have made payment')
    }

})


module.exports = {
    buyTicket
}

export {}