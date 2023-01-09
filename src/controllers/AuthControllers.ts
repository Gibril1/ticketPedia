import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async(req:Request, res:Response) => {

})

const loginUser = asyncHandler(async(req:Request, res:Response) => {

})

module.exports = {
    registerUser,
    loginUser
}