const Application = require("../models/application");
const events = require("events");
const eventEmitter = new events.EventEmitter();

// @desc Apply for position
// @route POST /application
exports.checkOpening = (req, res) => {
  let body = "";
  //
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    //Get data from request body
    const { _userId, _positionId, name, role } = JSON.parse(body);
    Application.find()
      .then((result) => {
        //Check if an entry with _userId and _positionId already exist
        const appExist = result.filter((p) => {
          return (
            //toString() to convert ObjectId to string
            p.user.userId.toString() === _userId &&
            p.position.positionId.toString() === _positionId
          );
        });

        //If the user already applied
        if (appExist.length > 0) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "You already applied" }));
        } else {
          //Else create entry in database
          const application = new Application({
            user: {
              name: name,
              userId: _userId.toString(),
            },
            position: {
              positionId: _positionId.toString(),
            },
          });
          application
            .save()
            .then((result) => {
              console.log("Applied");
              eventEmitter.emit("Applied");
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Apply for this position" }));
            })
            .catch((err) => {
              console.log(err);
              res.writeHead(404, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Could not apply" }));
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "No applications" }));
      });
  });
};

// @desc  Check Applications
// @route GET /checkApplicants
exports.checkApplicants = (req, res) => {
  Application.find()
    .then((result) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "No applications" }));
    });
};
