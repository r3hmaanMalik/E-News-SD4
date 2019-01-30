var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var world_detailSchema = new Schema({
	'id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'entertainment.id'
	},
	'title' : String,
	'content' : String,
	'ilink' : String
});

module.exports = mongoose.model('worlddetail', world_detailSchema);
