"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const { createEvents, getEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/EventControllers');
const { protect } = require('../middleware/AuthMiddleware');
router.route('/')
    .post(protect, createEvents)
    .get(protect, getEvents);
router.route('/:id')
    .get(protect, getEvent)
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);
module.exports = router;
