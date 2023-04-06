import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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

Users.plugin(mongoosePaginate);

export const UsersModel = mongoose.model('Users', Users)