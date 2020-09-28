var express = require("express"),
  routes = express.Router();
var passport = require("passport");
var sgrCtrl = require("../controllers/patient.controller");

routes.patch(
  "/addSugarLevel",
  passport.authenticate("jwt", { session: false }),
  sgrCtrl.add
);
routes.get(
  "/viewSugarLevel",
  passport.authenticate("jwt", { session: false }),
  sgrCtrl.view
);
routes.get(
  "/viewForDoctorSugarLevel/:hospitalId",
  passport.authenticate("jwt", { session: false }),
  sgrCtrl.viewForDoctor
);
module.exports = routes;
