const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const internshipRouter = require("./routes/internship");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "https://pwa-9709.onrender.com",
  })
);

app.use("/internship", internshipRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT || 5000, () => console.log("Server is on port 5000.."));



