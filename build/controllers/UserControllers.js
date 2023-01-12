"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const Ticket = require('../models/TicketsModel');
const Event = require('../models/EventModel');
const Payment = require('../models/PaymentModel');
const UserTickets = require('../models/UserTicketsModel');
// @desc Buy A Tickets
// @routes POST /api/user/buy/:id
// @access Private: User
const buyTicket = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(400);
        throw new Error('You are not authorized');
    }
    // check if the ticket exist
    const ticket = yield Ticket.findById(req.params.id);
    // destructuring from tickets
    const { price, availableTickets } = ticket;
    if (!ticket) {
        res.status(404);
        throw new Error(`Tickets with id ${req.params.id} does not exist`);
    }
    // check if that particular event exists
    const event = yield Event.findById(ticket.eventId);
    if (!event) {
        res.status(404);
        throw new Error(`Event with id ${ticket.eventId} does not exist`);
    }
    // check if ticket is sold out
    if (availableTickets === 0) {
        res.status(200).json('These ticket is sold out');
    }
    // getting the amount
    const { amount } = req.body;
    // checking if the exact amount has been paid
    if (!amount) {
        res.status(400);
        throw new Error('Kindly make sure you have paid the right amount');
    }
    if (amount !== price) {
        res.status(400).json('Please pay the right amunt');
    }
    const payment = yield Payment.create({
        ticketId: ticket._id,
        userId: req.user._id,
        eventId: event._id,
        amount: amount
    });
    let paymentMade;
    // buy the tickets
    if (payment) {
        paymentMade = yield UserTickets.create({
            userId: req.user._id,
            paymentId: payment._id
        });
    }
    if (payment && paymentMade) {
        yield ticket.updateOne({ availableTickets: ticket.availableTickets }, { $set: { availableTickets: ticket.availableTickets -= 1 } });
        res.status(200).json('Check your email. You have made payment');
    }
}));
module.exports = {
    buyTicket
};
