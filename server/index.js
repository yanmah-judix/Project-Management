const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose=require("mongoose");
require("dotenv").config();

const app = express();

//mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());



//  routes
app.get("/health", (req, res) => {
  res.json({ status: "Active" });
});


//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
