import mongoose, { Schema } from  "mongoose"


export interface IUser {
    email: string,
    password: string,
    role: string
}

const UserSchema = new Schema<IUser>({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model<IUser>('User', UserSchema)
