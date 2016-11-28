var Event = require('./../models/event');

module.exports = {
	create: function(req, res) {
		var event = new Event({title: req.body.title, description: req.body.description, _creator: req.body.creatorId})
		event.save(function(err, selectedEvent) {
			if (err) {
				res.json(err);
			} else {
				res.json(selectedEvent);
			}
		});
	},
	update: function(req, res) {
		Event.findOne({_id: req.body._id}, function(err, selectedEvent) {
			selectedEvent.completed = req.body.completed;
			selectedEvent.save(function(err, updatedEvent) {
				if (err) {
					res.json(err);
				} else {
					res.json(updatedEvent);
				}
			});
		});
	},
};