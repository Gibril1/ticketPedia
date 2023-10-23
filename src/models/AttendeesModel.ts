import mongoose, { Schema, Types }  from 'mongoose'

export interface IAttendees {
    firstName: string,
    lastName: string,
    dob: Date,
    userId: Types.ObjectId | undefined
}

const AttendeesSchema = new Schema<IAttendees>({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


const Attendees = mongoose.model<IAttendees>('Attendees', AttendeesSchema)

export {
    Attendees
}