import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import auth from "./routes/auth.js"

import { connectDatabase } from "./database/database.js";


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/api/auth", auth)

// app.use("/", (req, res) => {
//   return res.json("Welcome");
// });

//connect database
connectDatabase();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

