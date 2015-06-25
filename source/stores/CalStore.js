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
		this.date = new Date();
		this.date = {
			year: this.date.getFullYear(),
			month: this.date.getMonth() + 1,
			date: this.date.getDate()
		}
	},
	getInitialState: function() {
		return {
			width: this.width,
			height: this.height,
			avgW: this.avgW,
			avgH: this.avgH,
			thH: this.thH,
			date: this.date
		}
	},
	onChangeMonth: function(num) {
		var month = this.date.month + num;
		if (month < 1) {
			this.date.month = 12;
			this.date.year--;
		} else if (month > 12) {
			this.date.month = 1;
			this.date.year++;
		} else {
			this.date.month = month;
		}

		if (num === 0) {
			this.date = new Date();
			this.date = {
				year: this.date.getFullYear(),
				month: this.date.getMonth() + 1,
				date: this.date.getDate()
			}
		}

		this.trigger({
			width: this.width,
			height: this.height,
			avgW: this.avgW,
			avgH: this.avgH,
			thH: this.thH,
			date: this.date	
		});
	}
});

module.exports = CalStore;