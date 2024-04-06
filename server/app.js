import express from "express";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: '*'
}))
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/users", userRouter);

export default app;