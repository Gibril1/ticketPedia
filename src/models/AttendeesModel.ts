import mongoose, { Schema, Types }  from 'mongoose'

interface IAttendees {
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
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model<IAttendees>('Attendees', AttendeesSchema)