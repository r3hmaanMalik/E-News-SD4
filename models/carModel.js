var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({
	'title' : String,
	'newslink' : String,
	'imglink': String
});

module.exports = mongoose.model('trendings', carSchema);
