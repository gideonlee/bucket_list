var User = require('./../models/user');

module.exports = {
	index: function(req, res) {
		User.find({}).populate({path: '_events', populate: {path: '_creator'}}).exec(function(err, allUsers) {
			res.json(allUsers);
		});
	},
	create: function(req, res) {
		var newUser = new User(req.body);
		newUser.save(function(err, user) {
			if (err) {
				User.findOne({name: req.body.name}, function(err, selectedUser) {
					if (err) {
						res.json(err);
					} else {
						res.json(selectedUser);
					}
				})
			} else {
				res.json(user);
			}
		});
	},
	login: function(req, res) {
		User.findOne({_id: req.params.id}).populate({path: '_events', populate: {path: '_creator'}}).exec(function(err, selectedUser) {
			if (err) {
				res.json(err);
			} else {
				res.json(selectedUser);
			}
		});
	},
	find: function(req, res) {
		User.findOne({_id: req.params.id}, function(err, selectedUser) {
			if (err) {
				res.json(err);
			} else {
				res.json(selectedUser);
			}
		});
	}, 
	findAllExcept: function(req, res) {
		User.find({_id: {$nin: req.params.id}}, function(err, users) {
			if (err) {
				res.json(err);
			} else {
				res.json(users);
			}
		});
	},
	findUserByName: function(req, res) {
		User.findOne({name: req.params.name}, function(err, selectedUser) {
			if (err) {
				res.json(err);
			} else {
				res.json(selectedUser);
			}
		});
	},
	findPendingEvents: function(req, res) {
		User.find({_id: req.params.id}).populate({path: '_events', populate: {path: '_creator'}}).exec(function(err, selectedUser) {
			if (err) {
				res.json(err);
			} else {
				var pending = [];
				for (var i = 0; i < selectedUser[0]._events.length; i++) {
					if (selectedUser[0]._events[i].completed === false) {
						pending.push(selectedUser[0]._events[i]);
					}
				}
				res.json(pending);
			}
		});
	},
	findCompletedEvents: function(req, res) {
		User.find({_id: req.params.id}).populate({path: '_events', populate: {path: '_creator'}}).exec(function(err, selectedUser) {
			if (err) {
				res.json(err);
			} else {
				var completed = [];
				for (var i = 0; i < selectedUser[0]._events.length; i++) {
					if (selectedUser[0]._events[i].completed === true) {
						completed.push(selectedUser[0]._events[i]);
					}
				}
				res.json(completed);
			}
		});
	},
	update: function(req, res) {
		User.findOne({_id: req.body.user_id}, function(err, selectedUser) {
			selectedUser._events.push(req.body.event_id);
			selectedUser.save(function(err, updatedUser) {
				if (err) {
					res.json(err); 
				} else {
					res.json(updatedUser);
				}
			})
		})
	},

};