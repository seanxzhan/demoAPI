var mongoose = require('mongoose');

var feedBackSchema = mongoose.Schema({
  userID: String,
  sliderVal: Number,
  q1: String,
  q2: String,
  q3: String
})

// this can be accessed from the outside
var Feedback = module.exports = mongoose.model('Feedback', feedBackSchema);

// get Feedback
module.exports.getFeedback = function(callback, limit) {
  Feedback.find(callback).limit(limit);
}

