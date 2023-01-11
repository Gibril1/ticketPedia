import { Response } from 'express'
import { IGetUserAuthInfoRequest } from '../interfaces/AuthInterface'
const asyncHandler = require('express-async-handler')

const createTickets = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {

})
const getTickets = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {

})
const getTicket = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {

})
const updateTicket = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {

})
const deleteTicket = asyncHandler(async(req:IGetUserAuthInfoRequest, res:Response) => {

})

module.exports = {
    createTickets,
    getTicket,
    getTickets,
    updateTicket,
    deleteTicket
}

export {}
