var async = require('async');
var keys = require('../keys');

module.exports = function tag(user, tag, options) {
	var user = user;
	var tag = tag;
	var client = options.client;
	var namespace = options.namespace;

	return {
		allItems: function(cb) {
			allItems(cb);
		},
		allTags: function(cb) {
			allTags(cb)
		},
		itemsByUnion: function(cb) {
			itemsByUnion(cb)
		},
		itemsByInter: function(cb) {
			itemsByInter(cb)
		}
	}

	function allItems(cb) {
		client.smembers(keys.tagKey(user, tag, namespace), cb);
	}

	function allTags(cb) {
		client.smembers(keys.tagsKey(user, namespace), cb);
	}

	function itemsByUnion(cb) {
		var keyArray = tag.map(function(t) {
			return keys.tagKey(user, t, namespace);
		})
		client.sunion(keyArray, cb);
	}

	function itemsByInter(cb) {
		var keyArray = tag.map(function(t) {
			return keys.tagKey(user, t, namespace);
		})
		client.sinter(keyArray, cb);
	}

}