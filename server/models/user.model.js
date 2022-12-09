const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['Staff', 'Student']
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true,
    },
    resume: {
        url: String,
        uploadedAt: Date
    }
},{
    timestamps: true
})

const User = mongoose.model('user', UserSchema)

module.exports = User;