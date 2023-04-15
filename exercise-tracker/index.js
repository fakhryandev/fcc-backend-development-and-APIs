const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const MONGOURI = process.env.MONGOURI;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const apiRouter = require("./routes/api");

app.use(cors());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
