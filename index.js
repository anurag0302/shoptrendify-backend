const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
require('dotenv').config();

// require('./config/db');
// const authRoutes=require("./routes/authRoute");

app.use(cors({
    credentials: true,
    origin: process.env.URL,
  }));


app.get("/", (req, res) => {
  res.send("API Working on port 5000 ");
});
// app.use("/", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});