const express = require("express");
const userControllers = require("../controllers/user-controllers");

const Router = express.Router();

Router.get("/", userControllers.getAllUsers);
Router.get("/:userId", userControllers.getUserById);
Router.post("/signup", userControllers.signup);
Router.post("/login", userControllers.login);

module.exports = Router;
