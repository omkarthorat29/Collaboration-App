var express = require("express"),
  routes = express.Router();
var passport = require("passport");
var msgCtrl = require("../controllers/message.controller");

routes.patch(
  "/addMessage/:selectedId/:selectedRole",
  passport.authenticate("jwt", { session: false }),
  msgCtrl.addMessage
);

routes.patch(
  "/updateMessage/:id/:msgId",
  passport.authenticate("jwt", { session: false }),
  msgCtrl.updateMessage
);

routes.get(
  "/getMessage/:selectedId/:limit",
  passport.authenticate("jwt", { session: false }),
  msgCtrl.getMessage
);

routes.get(
  "/getRecentMessages",
  passport.authenticate("jwt", { session: false }),
  msgCtrl.getRecentMessages
);

module.exports = routes;
