var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var RectStore = Reflux.createStore({
	listenables: Actions,
	init: function() {		
		this.data = {
			ctx: null,
			rect: []			
		};
	},
	daysInMonth: function(year, month) {
		return new Date(year, month, 0).getDate();
	},
	isMouseOn: function(x, y, thH, h, w) {
		if (y <= thH || x < 1) return false;
		var cols = Math.ceil(x / w);
		cols = cols > 7 ? 7 : cols;
		return Math.ceil((y - thH) / h) * 7 + cols - 1;
	},
	onInitRect: function(ctx, date) {
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var weeks = ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'];
		var month = date.getMonth();
		var day = date.getDate();
		var year = date.getFullYear();

		days = this.daysInMonth(year, month + 1);		
		var oneOfMonth = new Date(months[month]+' 1, '+year);
		var firstDay = oneOfMonth.getDay();		
		
		var ind = 1;
		for (var i = firstDay + 7; i < 42; i++) {
			this.data.rect[i].day = ind;
			ind++;
			if (ind > days)	break;
		}
		for (var i = 0; i < 7; i++) {
			this.data.rect[i].day = weeks[i];
		}


		this.data.ctx = ctx;
		this.trigger(this.data);
	},
    onSetRectInfo: function(data) {
    	this.data.rect.push(data);
    },
    onRectMouseMove: function(x, y, thH, h, w) {
    	var id = this.isMouseOn(x, y, thH, h, w);
    	if (!id) return;
    	var _color = this.data.rect[id].bg;
    	this.data.rect[id].bg = '#D7D7D7';
    	this.trigger(this.data);
    	this.data.rect[id].bg = _color;
    },
});

module.exports = RectStore;