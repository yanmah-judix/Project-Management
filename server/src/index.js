const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const errorMiddleware = require("./common/middleware/error.middleware");

const userRoutes = require("./features/users/users.routes");
const projectRoutes = require("./features/projects/projects.routes");
const taskRoutes = require("./features/tasks/tasks.routes");

const app = express();

connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/project", projectRoutes);
app.use("/", taskRoutes);

app.use(errorMiddleware);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);