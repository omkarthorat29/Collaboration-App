var express = require("express"),
  routes = express.Router();
var hospitalCtrl = require("../controllers/hospital.controller");
var passport = require("passport");

routes.patch(
  "/create",
  passport.authenticate("jwt", { session: false }),
  hospitalCtrl.create
);

routes.patch("/addValidity", hospitalCtrl.addValidity);

routes.get(
  "/getHospital/:id",

  hospitalCtrl.getHospital
);

routes.get(
  "/getValidity/:hospitalId",

  hospitalCtrl.getValidity
);

routes.get(
  "/getAllHospitalUserTypeWise/:hospitalId",
  passport.authenticate("jwt", { session: false }),
  hospitalCtrl.getAllHospitalUserTypeWise
);

routes.get(
  "/allUsers/:hospitalId/:role",
  passport.authenticate("jwt", { session: false }),
  hospitalCtrl.allUsers
);

module.exports = routes;
