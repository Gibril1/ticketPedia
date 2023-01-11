import mongoose, { Schema, Types } from "mongoose";


export interface IEvent {
    name: string,
    description: string,
    location: string,
    population: number,
    organizerId?: Types.ObjectId,
    createdAt: Date,
    date: Date,
    timeDuration?: Date,
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
    location:{
        type:String,
        required: true
    },
    population:{
        type:Number,
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
    },
    date: {
        type: Date,
        required: true
    },
    timeDuration: {
        type: Date,
    }
})


module.exports = mongoose.model<IEvent>('Event', EventSchema)