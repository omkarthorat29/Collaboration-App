var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var passport = require("passport");
var mongoose = require("mongoose");
var config = require("./config/config");
var port = 5000;
var cors = require("cors");

var app = express();
app.use(cors());

var socket = require("socket.io");
var server = http.createServer(app);
var io = socket.listen(server);
app.set("socketio", io);
app.set("server", server);

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require("./middleware/passport");
passport.use(passportMiddleware);

// Demo Route (GET http://localhost:5000)
app.get("/", function (req, res) {
  return res.send("Hello! The API is at http://localhost:" + port + "/api");
});

var routes = require("./routes/auth");
var hospital = require("./routes/hospital");
var message = require("./routes/message");
var task = require("./routes/task");
var imageUpload = require("./routes/image-upload");
var docUpload = require("./routes/doc-upload");
var patient = require("./routes/patient");

app.use("/api/auth", routes);
app.use("/api/hospital", hospital);
app.use("/api/task", task);
app.use("/api/message", message);
app.use("/api/image/", imageUpload);
app.use("/api/document/", docUpload);
app.use("/api/patient/", patient);

// `mongodb://omkarthorat29:${encodeURIComponent(
//   "omkar@1998"
// )}@13.127.156.159:27017/suvarsh?authSource=admin`
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

connection.on("error", (err) => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

// Start the server
server.listen(5000, () =>
  console.log(`Server Started at: http://localhost:${port}`)
);
// app
//   .get("server")
//   .listen(5000, () =>
//     console.log(`Server Started at: http://localhost:${port}`)
//   );
//console.log("Server Started at: http://localhost:" + port);
