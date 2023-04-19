const moment = require("moment");
const Exercise = require("../models/Exercise");
const User = require("../models/User");

exports.create_exercise = (req, res) => {
  const userID = req.params.userID;

  const { description, duration, date } = req.body;

  User.findById(userID)
    .then((user) => {
      const exercise = new Exercise({
        description,
        duration,
        date: date ? date : new Date(),
        userID: user.userID,
      });

      exercise.save();
    })
    .then((data) => {
      return res.json({
        // username: user.username,
        description: data.description,
        duration: data.duration,
        date: moment(data.date).format("DDD MM DD YYYY"),
        _id: data.id,
      });
    })
    .catch((err) => {
      res.json({
        message: err._message,
      });
    });
};

exports.get_exercises = (req, res) => {
  const userID = req.params.userID;

  User.findById(userID)
    .populate("exercise")
    .exec()
    .then((data) => {
      console.log("---");
      console.log(data);
      // return res.json({
      //   username: data.
      // })
    })
    .catch((err) => {
      res.json({
        message: err._message,
      });
    });
};
