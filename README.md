##Usage

```javascript
var taggie = require('../').init({
	host: '127.0.0.1',
	port: '6379',
	options: {},
	namespace: 'taggie'
});

taggie.tag('ltebean', 'css','bootstrap', function(err, res) {})
taggie.tag('ltebean', 'web','bootstrap', function(err, res) {})
taggie.tag('ltebean', 'web','jquery', function(err, res) {})
taggie.tag('ltebean', 'js','jquery', function(err, res) {})
taggie.tag('ltebean', 'js','nodejs', function(err, res) {})

taggie.getTags('ltebean', function(err, tags) {
	console.log("ltebean 's tags: %s",tags);
	// ltebean 's tags: js,web,css
});

taggie.getItemsByInterTags('ltebean',['js','web'],function(err,items){
	console.log('tagged with js and web: %s',items);
	// tagged with js and web: jquery
});

taggie.getItemsByUnionTags('ltebean',['js','web'],function(err,items){
	console.log('tagged with js or web: %s',items);
	//tagged with js or web: jquery,bootstrap,nodejs
});

taggie.untag('ltebean', 'js','nodejs', function(err, res) {})


```