import { Response, NextFunction } from "express"
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
import { IGetUserAuthInfoRequest } from "../interfaces/AuthInterface"

const protect = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // get token
            token = req.headers.authorization.split(' ')[1]

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // GET user from the token
            req.user = await User.findById(decoded.id).select('-password') 
            next()
        } catch(err) {
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized. No token')
    }
})

export { protect } 