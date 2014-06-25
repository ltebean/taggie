var redis = require('redis');

var taggie = require('../').initWithRedisClient({
	client: redis.createClient(),
	namespace: 'test'
});

taggie.user('ltebean').item('bootstrap').addTag('css', function(err, res) {});
taggie.user('ltebean').item('bootstrap').addTag('web', function(err, res) {});
taggie.user('ltebean').item('jquery').addTag('web', function(err, res) {});
taggie.user('ltebean').item('jquery').addTag('js', function(err, res) {});
taggie.user('ltebean').item('nodjs').addTag('js', function(err, res) {});

taggie.user('ltebean').item('jquery').allTags(function(err, res) {
	console.log("jquery 's tag: %s", res);
});

taggie.user('ltebean').item().allItems(function(err, res) {
	console.log("all items: %s", res);
});

taggie.user('ltebean').tag('web').allItems(function(err,res){
	console.log('tagged with web: %s',res);
});

taggie.user('ltebean').tag().allTags(function(err,res){
	console.log('all tags: %s',res);
});

taggie.user('ltebean').tag(['web','js']).itemsByInter(function(err,res){
	console.log('tagged with web and js: %s',res);
});

taggie.user('ltebean').tag(['web','js']).itemsByUnion(function(err,res){
	console.log('tagged with web or js: %s',res);
});

//taggie.user('ltebean').item('nodjs').removeTag('js', function(err, res) {});
