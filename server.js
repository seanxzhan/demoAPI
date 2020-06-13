// we are using the express framework
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var FEEDBACK_COLLECTION = "feedback";

var app = express();
app.use(bodyParser.json());

var db;

// connect to the database.
// NOTE: this is curretly hosted on local server
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// handling errors
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// endpoint: /api/feedback
app.get("/api/feedback", function(req, res) {
  // find all
  db.collection(FEEDBACK_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get feedback.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/feedback", function(req, res) {
  var newFeedback = req.body;
  db.collection(FEEDBACK_COLLECTION).insertOne(newFeedback, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to add new entry.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
