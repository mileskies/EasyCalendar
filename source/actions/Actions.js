var Reflux = require('reflux');

var Actions = Reflux.createActions([
	/** cal store **/
	'changeMonth',

	/** rect store **/
	'initRect',
	'setRectInfo',
	'rectMouseMove',
	'rectMouseClick',
	'rectUpdateMonth',
]);

module.exports = Actions;