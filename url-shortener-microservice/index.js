require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const randomstring = require("randomstring");
const dns = require("dns");

// Basic Configuration
const port = process.env.PORT || 3000;
const MONGOURI = process.env.MONGO_URI;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const Schema = mongoose.Schema;

const urlShorterSchema = new Schema({
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
});

const URLShorter = mongoose.model("URLShorter", urlShorterSchema);

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", (req, res) => {
  const origUrl = req.body.url;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  dns.lookup(origUrl.replace(urlRegex, ""), (err, address) => {
    if (err) {
      return res.json({
        error: "invalid URL",
      });
    }

    createAndSave(origUrl, (data) => {
      return res.json({
        original_url: data.origUrl,
        short_url: data.shortUrl,
      });
    });
  });
});

app.get("/api/shorturl/:short", (req, res) => {
  const short = req.params.short;
  findOneByShort(short, (data) => {
    res.redirect(data.origUrl);
  });
});

function createAndSave(origUrl, done) {
  findOneByOrig(origUrl, (data) => {
    if (data) done(data);
    if (!data) {
      const randomString = randomstring.generate(8);

      const newShortURL = new URLShorter({
        origUrl,
        shortUrl: randomString,
      });

      newShortURL
        .save()
        .then((data) => done(data))
        .catch((err) => {
          console.log(err);
          return res.json({
            message: err.message,
          });
        });
    }
  });
}

function findOneByShort(short, done) {
  URLShorter.findOne({
    shortUrl: short,
  })
    .then((data) => {
      done(data);
    })
    .catch((err) => {
      return res.json({
        message: err.message,
      });
    });
}

function findOneByOrig(orig, done) {
  URLShorter.findOne({
    origUrl: orig,
  })
    .then((data) => done(data))
    .catch((err) => done(err));
}

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
