import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        await mongoose.connect(
          `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        );
        console.log("database connected");
    } catch (error) {
        console.log("connect fail")
    }
}
