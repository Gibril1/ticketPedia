import mongoose, { Schema, Types } from  "mongoose"

export interface ITicket {
    eventId?: Types.ObjectId,
    userId?: Types.ObjectId,
    price: number,
    category: string,
    totalTickets: number,
    availableTickets: number,
}


const TicketSchema = new Schema<ITicket>({
    eventId: {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    totalTickets:{
        type: Number,
        required: true
    },
    availableTickets:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model<ITicket>('Tickets', TicketSchema)