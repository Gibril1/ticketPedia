import mongoose, { Schema, Types }  from 'mongoose'

interface IOrganizer {
    firstName: string,
    lastName: string,
    dob: Date,
    userId?: Types.ObjectId 
}

const OrganizerSchema = new Schema<IOrganizer>({
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


const Organizer = mongoose.model<IOrganizer>('Organizer', OrganizerSchema)

export {
    Organizer
}