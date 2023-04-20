const User = require("../models/User");

exports.create_user = async (req, res) => {
  try {
    const username = req.body.username;

    const user = new User({
      username,
    });

    const data = await user.save();

    res.json({
      username: data.username,
      _id: data._id,
    });
  } catch (error) {
    res.json({
      message: error._message,
    });
  }
};

exports.get_users = async (req, res) => {
  try {
    const users = await User.find({}).select("_id username");

    res.json(users);
  } catch (error) {
    res.json({
      message: error._message,
    });
  }
};
