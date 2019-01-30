var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var newsSchema = new Schema({
	'heading' : String,
	'image' : String,
	'detail' : String,
	'date' : String
});

module.exports = mongoose.model('news', newsSchema);
