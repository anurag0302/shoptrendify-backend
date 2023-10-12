const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
require("dotenv").config();

require("./config/db");
const productsRoute = require("./routes/productsRoute");
const userRoute= require("./routes/userRoute")

const allowedOrigins = [
  process.env.URL, // Add other origins as needed
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("/", (req, res) => {
  res.send("API Working on port 5000 ");
});
app.use("/", productsRoute);
app.use("/authentication", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
