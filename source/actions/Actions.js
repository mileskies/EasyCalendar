var Reflux = require('reflux');

var Actions = Reflux.createActions([
	'initRect',
	'setRectInfo',
	'rectMouseMove'
]);

module.exports = Actions;