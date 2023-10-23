import mongoose, { Schema, Types } from  "mongoose"

export interface ITicket {
    _id?: Types.ObjectId,
    eventId?: Types.ObjectId,
    organizerId?: Types.ObjectId,
    price: number,
    category: string,
    totalTickets: number,
    availableTickets: number,
}


const TicketSchema = new Schema<ITicket>({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    organizerId: {
        type: Schema.Types.ObjectId,
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

const Ticket = mongoose.model<ITicket>('Tickets', TicketSchema)

export {
    Ticket
}