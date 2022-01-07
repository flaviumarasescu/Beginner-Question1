const Position = require("../models/position");
const Application = require("../models/application");

const events = require("events");
const eventEmitter = new events.EventEmitter();

// @desc Gets All Positions
// @route GET /positions
exports.getPositions = (req, res) => {
  Position.find({ status: true })
    .then((positions) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(positions));
    })
    .catch((err) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Positions not found" }));
    });
};

// @desc Gets Single Position
// @route GET /positions/:id
exports.getPosition = (req, res, id) => {
  Position.findById(id)
    .then((position) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(position));
    })
    .catch((err) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Position not found" }));
    });
};

// @desc Add Opening
// @route POST /addOpening
exports.addOpening = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    //Get data from request body
    const {
      projectName,
      clientName,
      technologies,
      role,
      jobDescription,
      status,
    } = JSON.parse(body);

    const opening = new Position({
      projectName: projectName,
      clientName: clientName,
      technologies: technologies,
      role: role,
      jobDescription: jobDescription,
      status: status,
    });
    opening
      .save()
      .then((result) => {
        console.log("opening");
        eventEmitter.emit("opening");
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Opening added" }));
      })
      .catch((err) => {
        console.log(err);
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Could not add Opening " }));
      });
  });
};

// @desc Update Opening
// @route PUT /positions/:id
exports.updatePosition = (req, res, id) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    //Get data from request body
    const {
      projectName,
      clientName,
      technologies,
      role,
      jobDescription,
      status,
    } = JSON.parse(body);

    Position.findById(id)
      .then((position) => {
        if (status === undefined) {
          status = position.status;
        }

        (position.projectName = projectName || position.projectName),
          (position.clientName = clientName || position.clientName),
          (position.technologies = technologies || position.technologies),
          (position.role = role || position.role),
          (position.jobDescription = jobDescription || position.jobDescription),
          (position.status = status);

        position
          .save()
          .then((result) => {
            if (position.status === false) {
              //Check if there are applicants for this position
              Application.find().then((result) => {
                //Array with all applicants
                const applicants = result.filter((p) => {
                  return (
                    //toString() to convert ObjectId to string
                    p.position.positionId.toString() === id
                  );
                });
                console.log(
                  "The following persons applied for this position:",
                  applicants
                );
              });
            }

            console.log("opening updated");
            eventEmitter.emit("opening updated");
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Opening updated" }));
          })
          .catch((err) => {
            console.log(err);
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Could not UPDATE Opening " }));
          });
      })
      .catch((err) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Opening not found" }));
      });
  });
};

// @desc Delete Opening
// @route DELETE /deleteOpening/:id
exports.deleteOpening = (req, res, id) => {
  Position.deleteOne({ _id: id })
    .then((result) => {
      console.log("Opening destroyed", result.deletedCount);
      if (result.deletedCount > 0) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Opening destroyed" }));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Opening not found" }));
      }
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Opening not found" }));
    });
};
