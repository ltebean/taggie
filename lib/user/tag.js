var async = require('async');
var Keys = require('../keys');

function Tag(user, tag, options) {
	this.user = user;
	this.tag = tag;
	this.client = options.client;
	this.keys = new Keys(options.namespace);
}

module.exports = Tag;

Tag.prototype.allItems = function(cb) {
	this.client.smembers(this.keys.tagKey(this.user, this.tag), cb);
}

Tag.prototype.allTags = function(cb) {
	this.client.smembers(this.keys.tagsKey(this.user), cb);
}

Tag.prototype.itemsByUnion = function(cb) {
	var self = this;
	var keyArray = self.tag.map(function(tag) {
		return self.keys.tagKey(self.user, tag);
	})
	this.client.sunion(keyArray, cb);
}

Tag.prototype.itemsByInter = function(cb) {
	var self = this;
	var keyArray = self.tag.map(function(tag) {
		return self.keys.tagKey(self.user, tag);
	})
	self.client.sinter(keyArray, cb);
}