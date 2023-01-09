import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const Organizer = require('../models/OrganizerModel')
const Attendees = require('../models/AttendeesModel')

const registerUser = asyncHandler(async(req:Request, res:Response) => {
    if(!req.body){
        res.status(404)
        throw new Error('Please enter all fields')
    }

    const { email, password, role } = req.body

    if(!email || email === '' || !password || password === '' || !role || role === ''){
        res.status(404)
        throw new Error('Please enter all fields')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        email: email,
        password: hashedPassword,
        role: role
    })

    if(user.role === 'organizer'){
        const organizer = await Organizer.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            userId: user._id
        })

        res.status(201).json({
            message:`Account has been successfully created for ${req.body.firstName}!`
        })
    }else{
        const attendee = await Attendees.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            userId: user._id
        })
        res.status(201).json({
            message:`Account has been successfully created for ${req.body.firstName}!`
        })
    }


    

})

const loginUser = asyncHandler(async(req:Request, res:Response) => {
    // receive inputs from user
    const { email, password } = req.body

    // check if inputs have been supplied
    if(!email || !password){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // check if user exists
    const user = await User.findOne({ email })

    if(!user){
        res.status(400)
        throw new Error(`No user with email ${email} exists`)
    }

    if(user && bcrypt.compare(password, user.password)){
        res.status(200).json({
            id: user._id,
            token: generateToken(user._id)
        })
    }else{
        res.status(404)
        throw new Error('Invalid Credentials')
    }


})


const generateToken = ( id:string ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser
}