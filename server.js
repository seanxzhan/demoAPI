// we are using the express framework
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var FEEDBACK_COLLECTION = "feedback";
Feedback = require('feedback.js')

var app = express();
app.use(bodyParser.json());

var db;

// connect to the database.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// handling errors
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/", function(req, res) {
  res.send("Please use /api/feedback");
})

app.get("/api/feedback", function(req, rest) {
  Feedback.getFeedback(function(err, feedback) {
    if (err) {
      throw err;
    }
    res.json(feedback)
  })
})

// endpoint: /api/feedback
// GET
// app.get("/api/feedback", function(req, res) {
//   // find all
//   db.collection(FEEDBACK_COLLECTION).find({}).toArray(function(err, docs) {
//     if (err) {
//       handleError(res, err.message, "Failed to get feedback.");
//     } else {
//       res.status(200).json(docs);
//     }
//   });
// });

// POST
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

// endpoint: /api/feedback/:id
// PUT by id
app.put("/api/feedback/:id", function(req, res) {
  var updateEntry = req.body;
  delete updateEntry._id;

  db.collection(FEEDBACK_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateEntry, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update entry");
    } else {
      updateEntry._id = req.params.id;
      res.status(200).json(updateEntry);
    }
  })
})

// DELETE
app.delete("/api/feedback/:id", function(req, res) {
  db.collection(FEEDBACK_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete entry");
    } else {
      // returns id of deleted entry
      res.status(200).json(req.params.id);
    }
  })
})
