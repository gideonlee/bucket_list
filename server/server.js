var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	port = 8000,
	app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../bower_components')));

app.use(bodyParser.json());

var routes = require('./config/routes');
routes(app);

var db = require('./config/mongoose');

app.listen(port, function() {
	console.log(`Listening on port ${port}`);
});
