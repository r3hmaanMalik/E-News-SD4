var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var lat_detailSchema = new Schema({
	'id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'latest'
	},
	'title' : String,
	'content' : String,
	'ilink' : String
});

module.exports = mongoose.model('lat_detail', lat_detailSchema);
