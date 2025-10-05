import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";


const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth",authRoutes)
app.use("/api/user",userRouter);

app.get("/", async (req, res) => {
    let prompt = req.query.prompt;
    let data =await geminiResponse(prompt);

    res.json(data);
});

app.listen(port, () => {
    connectDB()
    console.log(`Server started on port ${port}`);
})