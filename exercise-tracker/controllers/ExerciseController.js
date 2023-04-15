const Exercise = require("../models/Exercise");

exports.create_exercise = (req, res) => {
  const userID = req.params.userID;

  const { description, duration, date } = req.body;

  const exercise = new Exercise({
    description,
    duration,
    date,
    userID,
  });

  exercise
    .save()
    .then((data) => {
      res.json({
        username: data.userID,
        description: data.description,
        duration: data.duration,
        date: data.date,
        _id: data.id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: err._message,
      });
    });
};
