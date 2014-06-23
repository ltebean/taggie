var redis = require("redis");
var sf = require('string-format');
var async = require('async');

exports.init = function(config) {
	return new API({
		client: redis.createClient(config.port || 6379, config.host || 'localhost', config.options || {}),
		namespace: config.namespace
	});
}

exports.initWithRedisClient = function(config) {
	return new API({
		client: config.client,
		namespace: config.namespace
	});
}

function API(options) {
	this.client = options.client;
	this.namespace = options.namespace ? options.namespace + ':' : '';
}

API.prototype.tag = function(user, tag, item, cb) {
	this.client.multi()
		.sadd(this._tagKey(user, tag), item)
		.sadd(this._itemKey(user, item), tag)
		.sadd(this._tagsKey(user), tag)
		.exec(function(err, replies) {
			cb && cb(err);
		});
}

API.prototype.untag = function(user, tag, item, cb) {
	var self = this;
	async.waterfall([

		function untag(done) {
			self.client.multi()
				.srem(self._tagKey(user, tag), item)
				.srem(self._itemKey(user, item), tag)
				.scard(self._tagKey(user, tag))
				.exec(function(err, res) {
					done(err, res[2]);
				})
		},
		function removeTagIfNecessary(remain, done) {
			if (remain > 0) {
				return done();
			}
			self.client.srem(self._tagsKey(user), tag, done)
		}
	], function(err, items) {
		cb && cb(err, items);
	})
}

API.prototype.getTags = function(user, cb) {
	this.client.smembers(this._tagsKey(user), cb);
}

API.prototype.getItemsByTag = function(user, tag, cb) {
	this.client.smembers(this._tagKey(user, tag), cb);
}

API.prototype.getItemTags = function(user, item, cb) {
	this.client.smembers(this._itemKey(user, item), cb);
}

API.prototype.getAllItems = function(user, cb) {
	var self = this;
	async.waterfall([

		function getKeys(done) {
			self.client.keys(self._tagKey(user, '*'), done)
		},
		function union(keys, done) {
			if (!keys || keys.lengh == 0) {
				return done();
			}
			self.client.sunion(keys, done);
		}
	], function(err, items) {
		cb(err, items)
	})
}

API.prototype.getItemsByInterTags = function(user, tags, cb) {
	var self = this;
	var keys = tags.map(function(tag) {
		return self._tagKey(user, tag);
	})
	this.client.sinter(keys, cb);
}

API.prototype.getItemsByUnionTags = function(user, tags, cb) {
	var self = this;
	var keys = tags.map(function(tag) {
		return self._tagKey(user, tag);
	})
	this.client.sunion(keys, cb);
}

API.prototype._tagKey = function(user, tag, namespace) {
	return '{namespace}user:{user}:tag:{tag}'.format({
		namespace: this.namespace,
		user: user,
		tag: tag
	});
}

API.prototype._itemKey = function(user, item, namespace) {
	return '{namespace}user:{user}:item:{item}'.format({
		namespace: this.namespace,
		user: user,
		item: item
	});
}

API.prototype._tagsKey = function(user, namespace) {
	return '{namespace}user:{user}:tags'.format({
		namespace: this.namespace,
		user: user
	});
}