var taggie = require('../').init({
	host: '127.0.0.1',
	port: '6379',
	options: {},
	namespace: ''
});

taggie.tag('ltebean', 'ui', 'mbox', function(err, res) {})
taggie.tag('ltebean', 'util', 'querystring', function(err, res) {})
taggie.tag('ltebean', 'util', 'json', function(err, res) {})
taggie.tag('ltebean', 'web', 'mbox', function(err, res) {})
taggie.tag('ltebean', 'web', 'jquery', function(err, res) {})

// taggie.getTags('ltebean', function(err, tags) {
// 	console.log("ltebean 's tags: %s", tags);
// 	// ltebean 's tags: js,web,css
// });

// taggie.getItemsByTag('ltebean', 'js', function(err, tags) {
// 	console.log("tagged with js: %s", tags);
// 	// tagged with js: js,web,css
// });

// taggie.getAllItems('ltebean', function(err, items) {
// 	console.log('all items: %s', items);
// 	// all items: jquery,nodejs,bootstrap
// });

// taggie.getItemsByInterTags('ltebean', ['js', 'web'], function(err, items) {
// 	console.log('tagged with js and web: %s', items);
// 	// tagged with js and web: jquery
// });

// taggie.getItemsByUnionTags('ltebean', ['js', 'web'], function(err, items) {
// 	console.log('tagged with js or web: %s', items);
// 	//tagged with js or web: jquery,bootstrap,nodejs
// });

// //taggie.untag('ltebean', 'js','nodejs', function(err, res) {})