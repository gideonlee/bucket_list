var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var EventSchema = new Schema({
	title: {
		type: String,
		required: true,
		minlength: 5
	},
	description: {
		type: String,
		required: true,
		minlength: 10
	},
	_creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	completed: {
		type: Boolean,
		default: false
	}
}, {timestamps: true});

module.exports = mongoose.model('Event', EventSchema);