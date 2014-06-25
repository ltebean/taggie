var async = require('async');
var Keys = require('../keys');

function Item(user, item, options) {
	this.user = user;
	this.item = item;
	this.client = options.client;
	this.keys = new Keys(options.namespace);
}

module.exports = Item;

Item.prototype.addTag = function(tag, cb) {
	var user = this.user;
	var item = this.item;
	var keys = this.keys;
	var client = this.client;
	client.multi()
		.sadd(keys.tagKey(user, tag), item)
		.sadd(keys.itemKey(user, item), tag)
		.sadd(keys.tagsKey(user), tag)
		.exec(function(err, replies) {
			cb && cb(err);
		});
}

Item.prototype.removeTag = function(tag, cb) {
	var user = this.user;
	var item = this.item;
	var keys = this.keys;
	var client = this.client;
	async.waterfall([

		function untag(done) {
			client.multi()
				.srem(keys.tagKey(user, tag), item)
				.srem(keys.itemKey(user, item), tag)
				.scard(keys.tagKey(user, tag))
				.exec(function(err, res) {
					done(err, res[2]);
				})
		},
		function removeTagIfNecessary(remain, done) {
			if (remain > 0) {
				return done();
			}
			client.srem(keys.tagsKey(user, tag), tag, done)
		}
	], function(err, items) {
		cb && cb(err, items);
	})
}

Item.prototype.allTags = function(cb) {
	this.client.smembers(this.keys.itemKey(this.user, this.item), cb);
}

Item.prototype.allItems = function(cb) {
	var user = this.user;
	var item = this.item;
	var keys = this.keys;
	var client = this.client;
	async.waterfall([

		function getKeys(done) {
			client.keys(keys.tagKey(user, '*'), done)
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