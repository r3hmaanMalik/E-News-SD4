var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var sports_detailSchema = new Schema({
	'id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'sports'
	},
	'title' : String,
	'content' : String,
	'ilink' : String
});

module.exports = mongoose.model('sports_detail', sports_detailSchema);
