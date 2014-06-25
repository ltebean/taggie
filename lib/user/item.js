var async = require('async');
var keys = require('../keys');

module.exports = function item(user, item, options) {
	var user = user;
	var item = item;
	var client = options.client;
	var namespace = options.namespace;

	return {
		addTag: function(tag, cb) {
			addTag(tag, cb);
		},
		removeTag: function(tag, cb) {
			removeTag(tag, cb);
		},
		allTags: function(cb) {
			allTags(cb);
		},
		allItems: function(cb) {
			allItems(cb)
		}
	}

	function addTag(tag, cb) {
		client.multi()
			.sadd(keys.tagKey(user, tag, namespace), item)
			.sadd(keys.itemKey(user, item, namespace), tag)
			.sadd(keys.tagsKey(user, namespace), tag)
			.exec(function(err, replies) {
				cb && cb(err);
			});
	}

	function removeTag(tag, cb) {
		async.waterfall([

			function untag(done) {
				client.multi()
					.srem(keys.tagKey(user, tag, namespace), item)
					.srem(keys.itemKey(user, item, namespace), tag)
					.scard(keys.tagKey(user, tag, namespace))
					.exec(function(err, res) {
						done(err, res[2]);
					})
			},
			function removeTagIfNecessary(remain, done) {
				if (remain > 0) {
					return done();
				}
				client.srem(keys.tagsKey(user, tag, namespace), tag, done)
			}
		], function(err, items) {
			cb && cb(err, items);
		})
	}

	function allTags(cb) {
		client.smembers(keys.itemKey(user, item, namespace), cb);
	}

	function allItems(cb) {
		async.waterfall([

			function getKeys(done) {
				client.keys(keys.tagKey(user, '*', namespace), done)
			},
			function union(keys, done) {
				if (!keys || keys.length == 0) {
					return done();
				}
				client.sunion(keys, done);
			}
		], function(err, items) {
			cb(err, items)
		})
	}
}