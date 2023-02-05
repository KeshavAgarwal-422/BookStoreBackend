require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/book-routes");
const userRouter = require("./routes/user-routes");
const MONGOURI = process.env.MONGOURI;
const cors = require("cors");
const PORT = process.ev.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/user", userRouter);
app.use("/books", bookRouter);
mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("Connected to the database");
  })
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
