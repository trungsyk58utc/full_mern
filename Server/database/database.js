import mongoose from "mongoose";

// const URI = process.env.DATABASE_URL;
// const DB_NAME = process.env.DATABASE_NAME;

export const connectDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Mern_app", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("database connected");
    } catch (error) {
        console.log("connect fail")
    }
}
