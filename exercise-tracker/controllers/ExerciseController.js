const Exercise = require("../models/Exercise");
const User = require("../models/User");

exports.create_exercise = async (req, res) => {
  try {
    const userID = req.params.userID;

    const user = await User.findById(userID);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const { description, duration, date } = req.body;

    const exercise = new Exercise({
      description,
      duration,
      date: date ? date : new Date(),
    });

    const newExercise = await exercise.save();

    user.exercises.push(newExercise._id);
    await user.save();

    res.json({
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
      _id: user._id,
    });
  } catch (err) {
    res.json({
      message: err._message,
    });
  }
};

exports.get_exercise = async (req, res) => {
  try {
    const userID = req.params.userID;

    const user = await User.findById(userID).populate("exercises").exec();

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const from = new Date(req.query.from);
    const to = new Date(req.query.to);
    const limit = parseInt(req.query.limit);

    const exercises = user.exercises
      .filter((exercise) => {
        (!from || exercise.date >= from) && (!to || exercise.date <= to);
      })
      .slice(0, limit);

    res.json({
      username: user.username,
      count: user.exercises.length,
      _id: user._id,
      log: exercises.map((exercise) => ({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString(),
      })),
    });
  } catch (err) {
    res.json({
      message: err._message,
    });
  }
};
