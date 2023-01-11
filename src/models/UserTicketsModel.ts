import mongoose, { Schema, Types } from  "mongoose"

export interface IUserTickets {
    userId?: Types.ObjectId,
    paymentId?: Types.ObjectId,
}

const UserTicketsSchema = new Schema<IUserTickets>({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
        required: true
    }
})

module.exports = mongoose.model<IUserTickets>('UserTickets', UserTicketsSchema)