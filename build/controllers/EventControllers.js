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
const Event = require('../models/EventModel');
// @desc Create Events
// @route POST /api/events/
// @access Private: Organizer
const createEvents = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // checking for authorization
    if (!req.user) {
        res.status(400);
        throw new Error('Not authorized');
    }
    if (req.user.role !== 'organizer') {
        res.status(400);
        throw new Error('You are not authorized');
    }
    // destructuring body data
    const { name, description, location, population, date } = req.body;
    // checking to see if input fields is valid
    if (!name || name === '' ||
        !description || description === '' ||
        !location || location === '' ||
        !population || !date) {
        res.status(400);
        throw new Error('Invalid input fields');
    }
    // creating and committing into database
    const event = yield Event.create({
        name: name,
        description: description,
        location: location,
        population: population,
        date: date,
        timeDuration: req.body.timeDuration ? req.body.timeDuration : null,
        organizerId: req.user._id
    });
    res.status(201).json(event);
}));
// @desc Get An Event
// @route GET /api/event/:id
// @access Private: Organizer
const getEvent = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // checking for authorization
    if (!req.user) {
        res.status(400);
        throw new Error('Not authorized');
    }
    if (req.user.role !== 'organizer') {
        res.status(400);
        throw new Error('You are not authorized');
    }
    // checking if that event exists
    const event = yield Event.findById(req.params.id);
    if (!event) {
        res.status(404);
        throw new Error(`Event with id ${req.params.id} does not exist`);
    }
    res.status(200).json(event);
}));
// @desc Get All Event
// @route GET /api/event/
// @access Private: Organizer
const getEvents = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // checking for authorization
    if (!req.user) {
        res.status(400);
        throw new Error('Not authorized');
    }
    if (req.user.role !== 'organizer') {
        res.status(400);
        throw new Error('You are not authorized');
    }
    // checking for the user's events
    const events = yield Event.find({ organizerId: req.user._id });
    if (events.length === 0) {
        res.status(200).json('You have no events. Create One');
    }
    res.status(200).json(events);
}));
// @desc Update An Event
// @route PUT /api/event/:id
// @access Private: Organizer
const updateEvent = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    // check if events exists
    const event = yield Event.findById(req.params.id);
    if (!event) {
        res.status(404);
        throw new Error(`Event with id ${req.params.id} does not exist`);
    }
    console.log(event.organizerId);
    console.log(req.user._id);
    // checking if the user is authorized 
    if (event.organizerId.toString() !== ((_a = req.user._id) === null || _a === void 0 ? void 0 : _a.toString())) {
        res.status(400);
        throw new Error('You are not authorized to update this event');
    }
    const updatedEvent = yield Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEvent);
}));
// @desc Delete An Event
// @route DELETE /api/event/:id
// @access Private: Organizer
const deleteEvent = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    // check if event exists
    const event = yield Event.findById(req.params.id);
    if (!event) {
        res.status(404);
        throw new Error(`Event with id ${req.params.id} does not exist`);
    }
    if (event.organizerId.toString() !== ((_b = req.user._id) === null || _b === void 0 ? void 0 : _b.toString())) {
        res.status(400);
        throw new Error('You are not authorized to delete this event');
    }
    yield event.remove();
    res.status(204).json({ _id: req.params._id });
}));
module.exports = {
    createEvents,
    getEvent,
    getEvents,
    updateEvent,
    deleteEvent
};
