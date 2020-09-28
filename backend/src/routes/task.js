var express = require("express"),
  routes = express.Router();
var taskCtrl = require("../controllers/task.controller");
var passport = require("passport");

routes.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  taskCtrl.add
);
routes.get(
  "/getAllTask",
  passport.authenticate("jwt", { session: false }),
  taskCtrl.findTask
);

routes.put(
  "/updateTask",
  passport.authenticate("jwt", { session: false }),
  taskCtrl.updateTask
);
routes.delete(
  "/deleteTask/:id",
  passport.authenticate("jwt", { session: false }),
  taskCtrl.deleteTask
);

routes.get(
  "/todaysTask",
  passport.authenticate("jwt", { session: false }),
  taskCtrl.todaysTask
);

module.exports = routes;
