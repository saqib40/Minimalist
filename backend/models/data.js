const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    details: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notes",
        }
    ],
});

const noteModel = mongoose.model('Notes', noteSchema); 
const userModel = mongoose.model('Users', userSchema);

module.exports = {noteModel, userModel};