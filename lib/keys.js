var sf = require('string-format');

exports.tagKey = function(user, tag, namespace) {
	return '{namespace}user:{user}:tag:{tag}'.format({
		namespace: namespace,
		user: user,
		tag: tag
	});
}

exports.itemKey = function(user, item, namespace) {
	return '{namespace}user:{user}:item:{item}'.format({
		namespace: namespace,
		user: user,
		item: item
	});
}

exports.tagsKey = function(user, namespace) {
	return '{namespace}user:{user}:tags'.format({
		namespace: this.namespace,
		user: user
	});
}