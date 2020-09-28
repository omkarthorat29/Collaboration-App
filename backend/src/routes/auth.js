var express = require("express"),
  routes = express.Router();
var userController = require("../controllers/user-controller");
var passport = require("passport");

routes.post("/register", userController.registerUser);
routes.post("/login", userController.loginUser);
routes.patch(
  "/userUpdate",
  passport.authenticate("jwt", { session: false }),
  userController.userUpdate
);

routes.patch(
  "/adminUserUpdate/:id",
  passport.authenticate("jwt", { session: false }),
  userController.adminUserUpdate
);
routes.get(
  "/special",
  passport.authenticate("jwt", { session: false }),
  userController.profile
);

routes.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  userController.getUserProfile
);

module.exports = routes;
