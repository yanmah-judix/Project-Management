import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db";
import errorMiddleware from "./common/middleware/error.middleware";

import userRoutes from "./features/users/users.routes";
import projectRoutes from "./features/projects/projects.routes";
import taskRoutes from "./features/tasks/tasks.routes";

dotenv.config();

const app: Application = express();


connectDB();


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());


app.use("/", userRoutes);
app.use("/project", projectRoutes);
app.use("/", taskRoutes);

app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});