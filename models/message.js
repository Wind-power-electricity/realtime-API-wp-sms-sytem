import mongoose, { Schema } from 'mongoose'

const schema = new Schema( {
    sender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
} )

const Message = mongoose.model( 'message', schema )

export default Message;
