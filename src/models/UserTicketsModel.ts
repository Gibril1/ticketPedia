import mongoose, { Schema, Types } from  "mongoose"

export interface IUserTickets {
    userId?: Types.ObjectId,
    paymentId?: Types.ObjectId,
}

const UserTicketsSchema = new Schema<IUserTickets>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    }
})

const UserTickets = mongoose.model<IUserTickets>('UserTickets', UserTicketsSchema)

export {
    UserTickets
}