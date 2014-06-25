var item = require('./item');
var tag = require('./tag')

module.exports = function user(user, options) {
	var user = user
	return {
		item: function(name) {
			return item(user, name, options);
		},
		tag: function(name) {
			return tag(user, name, options);
		}
	}
}