const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.post("/users", userController.create_user);
router.get("/users", userController.get_users);

module.exports = router;
