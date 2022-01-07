const http = require("http");
// const fs = require("fs");

const User = require("./models/user");
// const Position = require("./models/position");
// const Application = require("./models/application");

const mongoose = require("mongoose");

const positionController = require("./controllers/positionController");
const applicationController = require("./controllers/applicationsController");

const server = http.createServer((req, res, next) => {
  const url = req.url;
  const method = req.method;

  if (url === "/positions" && method === "GET") {
    positionController.getPositions(req, res);
  } else if (url.match(/\positions\/\w+/) && method === "GET") {
    const id = url.split("/")[2];
    positionController.getPosition(req, res, id);
  } else if (url === "/application" && method === "POST") {
    applicationController.checkOpening(req, res);
  } else if (url === "/addOpening" && method === "POST") {
    positionController.addOpening(req, res);
  } else if (url.match(/\positions\/\w+/) && method === "PUT") {
    const id = url.split("/")[2];
    console.log("id", id);
    positionController.updatePosition(req, res, id);
  } else if (url.match(/\positions\/\w+/) && method === "DELETE") {
    const id = url.split("/")[2];
    console.log("id", id);
    positionController.deleteOpening(req, res, id);
  } else if (url === "/checkApplicants" && method === "GET") {
    applicationController.checkApplicants(req, res);
  }
});

//DB Connetion
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.enypk.mongodb.net/bquestion1?retryWrites=true&w=majority"
  )
  .then((result) => {
    //Create users if there are none in the database
    User.findOne().then((user1) => {
      if (!user1) {
        const user1 = new User({
          name: "user1",
          userName: "userName1",
          password: "user1",
          role: "user",
        });
        user1.save();
        const user2 = new User({
          name: "user2",
          userName: "userName2",
          password: "user2",
          role: "user",
        });
        user2.save();
        const user3 = new User({
          name: "user3",
          userName: "userName3",
          password: "user3",
          role: "user",
        });
        user3.save();
        const user4 = new User({
          name: "user4",
          userName: "userName4",
          password: "user4",
          role: "user",
        });
        user4.save();
        const user5 = new User({
          name: "user5",
          userName: "userName5",
          password: "user5",
          role: "user",
        });
        user5.save();
        const user6 = new User({
          name: "user6",
          userName: "userName6",
          password: "user6",
          role: "project manager",
        });
        user6.save();
        const user7 = new User({
          name: "user7",
          userName: "userName7",
          password: "user7",
          role: "project manager",
        });
        user7.save();
      }
    });

    server.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => {
    console.log(err);
  });
