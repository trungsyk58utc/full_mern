import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import auth from "./routes/auth.js"
import post from "./routes/post.js"

import { connectDatabase } from "./database/database.js";


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(morgan('dev'))
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/api/auth", auth),
app.use("/api/post", post)

// app.use("/", (req, res) => {
//   return res.json("Welcome");
// });

//connect database
connectDatabase();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

