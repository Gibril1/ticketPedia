import mongoose, { Schema, Types }  from 'mongoose'

interface IOrganizer {
    firstName: string,
    lastName: string,
    dob: Date,
    userId: Types.ObjectId | undefined
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
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model<IOrganizer>('Organizer', OrganizerSchema)