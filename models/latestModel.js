var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var latestSchema = new Schema({
	'title' : String,
	'discription' : String,
	'newslink' : String,
	'ilink' : String
});

module.exports = mongoose.model('latest', latestSchema);
