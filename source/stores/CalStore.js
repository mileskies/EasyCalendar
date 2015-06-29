var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var CalStore = Reflux.createStore({
	listenables: Actions,
	init: function() {		
		this.width = document.getElementById('YiZCal').offsetWidth;
		this.height = document.getElementById('YiZCal').offsetHeight;
		this.thH = (this.height - 14) / 21 * 2;
		this.avgW = (this.width - 16) / 7;
		this.avgH = (this.height - this.thH - 14) / 6;
	},
	getInitialState: function() {
		return {
			width: this.width,
			height: this.height,
			avgW: this.avgW,
			avgH: this.avgH,
			thH: this.thH
		}
	}
});

module.exports = CalStore;