const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { jwtAuthMiddleware } = require("../jwt");

router.get("/", userController.getAllUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/profile", jwtAuthMiddleware, userController.getProfile);
router.put("/profile/password", jwtAuthMiddleware, userController.updatePassword);
router.get("/:userName", userController.getUserByUserName);

module.exports = router;