import { Module } from "module"
import mongoose, { Schema, Types } from  "mongoose"

export interface IPayment {
    ticketId?: Types.ObjectId,
    userId?: Types.ObjectId,
    eventId?: Types.ObjectId,
    amount: Number
}

const PaymentSchema = new Schema<IPayment>({
    ticketId: {
        type: mongoose.Types.ObjectId,
        ref: 'Tickets',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model<IPayment>('Payment', PaymentSchema)