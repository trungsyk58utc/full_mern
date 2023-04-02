import mongoose from "mongoose";

const Users = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
}, {timestamps: true});

export const UsersModel = mongoose.model('Users', Users)