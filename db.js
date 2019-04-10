var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/candidates');
var Schema  = mongoose.Schema;




var candidateSchema  = new Schema( {
  name: String,
  votes: Number,
})

var Candidate = mongoose.model('Candidate', candidateSchema);

var saveCandidate  = (name, callback) => {
  Candidate.create({name: name, votes: 0}, callback);
}

var getCandidate = (callback) => {
  Candidate.find({}, callback);
}

var updateVote = (name,callback) => {
  Candidate.findOneAndUpdate({name: name}, {$inc: {votes: 1}}, callback)
}

module.exports.saveCandidate = saveCandidate;
module.exports.updateVote  = updateVote;
module.exports.getCandidate = getCandidate;

