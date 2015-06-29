var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var CalNavStore = Reflux.createStore({
	listenables: Actions,
	init: function() {
		this.date = new Date();
		this.date = {
			year: this.date.getFullYear(),
			month: this.date.getMonth() + 1,
			date: this.date.getDate()
		}
	},
	getInitialState: function() {
		return {
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
			date: this.date	
		});
	}
});

module.exports = CalNavStore;