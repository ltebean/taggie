var sf = require('string-format');

module.exports = function(n) {
	var namespace = n ? n + ':' : '';
	return {
		tagKey: function(user, tag) {
			return '{namespace}user:{user}:tag:{tag}'.format({
				namespace: namespace,
				user: user,
				tag: tag
			});
		},

		itemKey: function(user, item) {
			return '{namespace}user:{user}:item:{item}'.format({
				namespace: namespace,
				user: user,
				item: item
			});
		},

		tagsKey: function(user) {
			return '{namespace}user:{user}:tags'.format({
				namespace: namespace,
				user: user
			});
		}
	}
}