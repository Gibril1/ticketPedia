import mongoose, { Schema, Types } from  "mongoose"

export interface IPayment {
    _id?: Types.ObjectId,
    ticketId?: Types.ObjectId,
    userId?: Types.ObjectId,
    eventId?: Types.ObjectId,
    amount: Number
}

const PaymentSchema = new Schema<IPayment>({
    ticketId: {
        type: Schema.Types.ObjectId,
        ref: 'Tickets',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema)

export {
    Payment
}