const mongoose = require("mongoose");
const validURL = require('valid-url');
const randomString = require('randomstring');

const DB_USER = "********";
const DB_PASSWORD = "******";
const WEBSITE_URL = "http://localhost:8080/";

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds155509.mlab.com:55509/baza_kancianewskiego`);

var schema = new mongoose.Schema({
	short: String,
	url: String
});

var URL = mongoose.model("URL", schema);

function validateURL(url) {
	return validURL.isUri(url);
}

function shortenURL(value, cb) {

	if(!validateURL(value)) {
		return cb( new Error("URL is not valid"));
	}

	URL.findOne({url: value}).exec(function(err, url) {

		if(err) {
			return cb(err);
		}

		if(!url) {

			var short = randomString.generate(5);
			var newURL = new URL({
				short: short,
				url: value
			})

			newURL.save(function(err, url) {

				if(err) {
					return cb(err);
				} else {
					cb(null, WEBSITE_URL + url.short);
				}

			});

		} else {
			cb(null, WEBSITE_URL + url.short);
		}

	});
}

function findURL(short, cb) {

	URL.findOne({short: short}).exec(function(err, url) {

		if(!url || err) {
			return cb( new Error('URL not found'));
		}

		cb(null, url.url);
	});
}

module.exports = {
	shorten: shortenURL,
	find: findURL
}