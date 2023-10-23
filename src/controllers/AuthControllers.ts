import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User, Attendees, Organizer } from '../models/index'


const registerUser = asyncHandler(async(req:Request, res:Response) => {
    try {
        if(!req.body){
            res.status(404)
            throw new Error('Please enter all fields')
        }
    
        const { email, password, role } = req.body
    
        if(!email || !password || !role ){
            res.status(404)
            throw new Error('Please enter all fields')
        }
        if(role !== 'organizer' || role !== 'attendee'){
            res.status(400)
            throw new Error('Wrong role here')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const user = await User.create({
            email: email,
            password: hashedPassword,
            role: role
        })
    
        if(user.role === 'organizer'){
            await Organizer.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                userId: user._id
            })
    
            res.status(201).json({
                message:`Account has been successfully created for ${req.body.firstName}!`
            })
        }else{
            await Attendees.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                userId: user._id
            })
            res.status(201).json({
                message:`Account has been successfully created for ${req.body.firstName}!`
            })
        }
        
    } catch (error:any) {
        res.status(500)
        throw new Error(error)
    }
})

const loginUser = asyncHandler(async(req:Request, res:Response) => {
    try {
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

    if(user && await bcrypt.compare(password, user.password)){
        res.status(200).json({
            id: user._id,
            token: generateToken(user._id.toString())
        })
    }else{
        res.status(404)
        throw new Error('Invalid Credentials')
    }


    } catch (error:any) {
        res.status(500)
        throw new Error(error)
    }
})


const generateToken = ( id:string ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d'})
}

export {
    registerUser,
    loginUser
}