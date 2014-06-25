var sf = require('string-format');

function Keys(namespace) {
	this.namespace = namespace ? namespace + ':' : '';
}

module.exports = Keys;

Keys.prototype.tagKey = function(user, tag) {
	return '{namespace}user:{user}:tag:{tag}'.format({
		namespace: this.namespace,
		user: user,
		tag: tag
	});
}

Keys.prototype.itemKey = function(user, item) {
	return '{namespace}user:{user}:item:{item}'.format({
		namespace: this.namespace,
		user: user,
		item: item
	});
}

Keys.prototype.tagsKey = function(user) {
	return '{namespace}user:{user}:tags'.format({
		namespace: this.namespace,
		user: user
	});
}