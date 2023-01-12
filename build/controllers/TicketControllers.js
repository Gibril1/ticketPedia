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
// @desc Create Ticket for an event
// @routes POST /api/tickets/:id
// @access Private: Organizer
const createTickets = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // checking for authorization
    if (!req.user) {
        res.status(400);
        throw new Error('Not authorized');
    }
    if (req.user.role !== 'organizer') {
        res.status(400);
        throw new Error('You are not authorized');
    }
    // check if the event exists
    const event = yield Event.findById(req.params.id);
    if (!event) {
        res.status(404);
        throw new Error(`Event with id of ${req.params.id} does not exist`);
    }
    // check if the event organizer is the one creating tickets
    if (event.organizerId.toString() !== ((_a = req.user._id) === null || _a === void 0 ? void 0 : _a.toString())) {
        res.status(400);
        throw new Error('You are not authorized to create tickets for this event');
    }
    // destructuring the request body
    const { price, category, totalTickets, availableTickets } = req.body;
    if (!price || !totalTickets || !category) {
        res.status(400);
        throw new Error('Please enter fields');
    }
    const ticket = yield Ticket.create({
        eventId: event._id,
        organizerId: req.user._id,
        price: price,
        category: category,
        totalTickets: totalTickets,
        availableTickets: availableTickets ? availableTickets : totalTickets
    });
    res.status(201).json(ticket);
}));
// @desc Get All Tickets for the event
// @routes GET /api/tickets/:id
// @access Private: User
const getTickets = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(400);
        throw new Error('You are not authorized');
    }
    // check if the event exists
    const event = yield Event.findById(req.params.id);
    if (!event) {
        res.status(404);
        throw new Error(`Event with id of ${req.params.id} does not exist`);
    }
    const tickets = yield Ticket.find({ eventId: event._id });
    res.status(200).json(tickets);
}));
// @desc Get A Ticket for the event
// @routes GET /api/tickets/:id
// @access Private: User
const getTicket = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(400);
        throw new Error('You are not authorized');
    }
    // check if the tickets exists
    const ticket = yield Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error(`Ticket with id of ${req.params.id} does not exist`);
    }
    res.status(200).json(ticket);
}));
const updateTicket = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // checking for authorization
    if (!req.user) {
        res.status(400);
        throw new Error('Not authorized');
    }
    if (req.user.role !== 'organizer') {
        res.status(400);
        throw new Error('You are not authorized');
    }
    // check if the ticket exists
    const ticket = yield Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error(`Ticket with id of ${req.params.id} does not exist`);
    }
    // checking authorization
    if (ticket.organizerId.toString() !== ((_b = req.user._id) === null || _b === void 0 ? void 0 : _b.toString())) {
        res.status(400);
        throw new Error('You are not authorized to update this event');
    }
    const updatedTicket = yield Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTicket);
}));
const deleteTicket = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // checking for authorization
    if (!req.user) {
        res.status(400);
        throw new Error('Not authorized');
    }
    if (req.user.role !== 'organizer') {
        res.status(400);
        throw new Error('You are not authorized');
    }
    // check if the ticket exists
    const ticket = yield Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error(`Ticket with id of ${req.params.id} does not exist`);
    }
    // checking authorization
    if (ticket.organizerId.toString() !== req.user._id) {
        res.status(400);
        throw new Error('You are not authorized to update this event');
    }
    yield ticket.remove();
    res.status(204).json({ _id: req.params.id });
}));
module.exports = {
    createTickets,
    getTicket,
    getTickets,
    updateTicket,
    deleteTicket
};
