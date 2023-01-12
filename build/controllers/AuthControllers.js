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
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Organizer = require('../models/OrganizerModel');
const Attendees = require('../models/AttendeesModel');
const registerUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            res.status(404);
            throw new Error('Please enter all fields');
        }
        const { email, password, role } = req.body;
        if (!email || email === '' || !password || password === '' || !role || role === '') {
            res.status(404);
            throw new Error('Please enter all fields');
        }
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const user = yield User.create({
            email: email,
            password: hashedPassword,
            role: role
        });
        if (user.role === 'organizer') {
            yield Organizer.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                userId: user._id
            });
            res.status(201).json({
                message: `Account has been successfully created for ${req.body.firstName}!`
            });
        }
        else {
            yield Attendees.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                userId: user._id
            });
            res.status(201).json({
                message: `Account has been successfully created for ${req.body.firstName}!`
            });
        }
    }
    catch (error) {
        res.status(500);
        throw new Error(error);
    }
}));
const loginUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // receive inputs from user
        const { email, password } = req.body;
        // check if inputs have been supplied
        if (!email || !password) {
            res.status(400);
            throw new Error('Please enter all fields');
        }
        // check if user exists
        const user = yield User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error(`No user with email ${email} exists`);
        }
        if (user && bcrypt.compare(password, user.password)) {
            res.status(200).json({
                id: user._id,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(404);
            throw new Error('Invalid Credentials');
        }
    }
    catch (error) {
        res.status(500);
        throw new Error(error);
    }
}));
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
module.exports = {
    registerUser,
    loginUser
};
