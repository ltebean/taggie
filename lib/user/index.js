var Item = require('./item');
var Tag = require('./tag')

function User(user, options) {
	this.user = user;
	this.options = options;
}

module.exports = User;

User.prototype.item = function(item) {
	return new Item(this.user, item, this.options);
}

User.prototype.tag = function(tag) {
	return new Tag(this.user, tag, this.options);
}