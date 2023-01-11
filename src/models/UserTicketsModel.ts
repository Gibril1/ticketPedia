import mongoose, { Schema, Types } from  "mongoose"

export interface IUserTickets {
    ticketId?: Types.ObjectId,
    userId?: Types.ObjectId,
    eventId?: Types.ObjectId
}

const UserTicketsSchema = new Schema<IUserTickets>({
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
    }
})

module.exports = mongoose.model<IUserTickets>('UserTickets', UserTicketsSchema)