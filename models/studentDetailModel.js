var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentDetailSchema = new Schema({
	'id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'student.id'
	},
	'title' : String,
	'content' : String,
	'ilink' : String
});

module.exports = mongoose.model('studentDetail', studentDetailSchema);
