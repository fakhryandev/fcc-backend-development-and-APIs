const User = require("../models/User");

exports.create_user = (req, res) => {
  const username = req.body.username;

  const user = new User({
    username,
  });

  user
    .save()
    .then((data) =>
      res.json({
        username: data.username,
        _id: data._id,
      })
    )
    .catch((err) => {
      res.json({
        message: err._message,
      });
    });
};

exports.get_users = (req, res) => {
  User.find({})
    .select("_id username")
    .then((data) => res.json(data))
    .catch((err) =>
      res.json({
        message: err._message,
      })
    );
};
