var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var worldSchema = new Schema({
	'title' : String,
	'discription' : String,
	'newslink' : String,
	'ilink' : String
});

module.exports = mongoose.model('world', worldSchema);
