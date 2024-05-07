import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("combined"));

app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`server port http://localhost:3001 is running !!!`)
    )
  );

export default app;
