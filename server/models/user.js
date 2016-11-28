var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	_events: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Event'
		}
	]
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);