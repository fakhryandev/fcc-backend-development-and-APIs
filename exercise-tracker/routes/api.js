const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const exerciseController = require("../controllers/ExerciseController");

router.post("/users", userController.create_user);
router.get("/users", userController.get_users);
router.post("/users/:userID/exercises", exerciseController.create_exercise);
router.get("/users/:userID/logs", exerciseController.get_exercise);

module.exports = router;
