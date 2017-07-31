var keystone = require('keystone');
const crypto = require('crypto');
var Event = keystone.list('Event');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'newevent';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.eventSubmitted = false;
	locals.cloudinaryJSON = {
  "timestamp":  Date.now(),
  "api_key": "855418299746292",
}

	// On POST requests, add the Event item to the database
	view.on('post', { action: 'newevent' }, function (next) {

		var newEvent = new Event.model();
		var updater = newEvent.getUpdateHandler(req);
		console.log(req.body, "im the request body!")
		updater.process(req.body, {
			flashErrors: true,
			fields: 'creator, email, phone, title, picture, description',
			errorMessage: 'There was a problem submitting your event:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.eventSubmitted = true;
			}
			next();
		});
	});

	view.render('newevent');
};
