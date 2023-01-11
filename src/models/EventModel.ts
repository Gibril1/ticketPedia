import mongoose, { Schema, Types } from "mongoose";


export interface IEvent {
    name: string,
    description: string,
    organizerId?: Types.ObjectId,
    createdAt: Date
}

const EventSchema = new Schema<IEvent>({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    organizerId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model<IEvent>('Event', EventSchema)