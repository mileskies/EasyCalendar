var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var RectStore = Reflux.createStore({
	listenables: Actions,
	init: function() {
		this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		this.weeks = ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'];
		this.select_id = null;
		this.select_day = null;

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
	updateRect: function(date) {
		var month = date.month;
		var day = date.date;
		var year = date.year;

		days = this.daysInMonth(year, month);		
		var oneOfMonth = new Date(this.months[month - 1]+' 1, '+year);
		var firstDay = oneOfMonth.getDay() + 7;
		
		var ind = 1;		
		for (var i = 0; i < 49; i++) {
			this.data.rect[i].year = year;
			this.data.rect[i].month = month;
			this.data.rect[i].day = false;
			this.data.rect[i].select = false;
			if ((!this.select_day && ind == day) || (year+"/"+month+"/"+ind) == this.select_day) {
				this.select_day = year+"/"+month+"/"+ind;
				this.select_id = i;
				this.data.rect[i].select = true;
			}
			this.data.rect[i].hover = false;
			if (i >= firstDay && ind <= days) {
				this.data.rect[i].day = ind;
				ind++;
			}			
		}
		for (var i = 0; i < 7; i++) {
			this.data.rect[i].day = this.weeks[i];
		}
	},
    onSetRectInfo: function(data) {
    	this.data.rect.push(data);
    },
	onInitRect: function(ctx, date) {		
		this.updateRect(date);

		this.data.ctx = ctx;
		this.trigger(this.data);
	},
    onRectMouseMove: function(x, y, thH, h, w) {
    	var id = this.isMouseOn(x, y, thH, h, w);
    	if (!id) return;
    	this.data.rect[id].hover = true;
    	this.trigger(this.data);
    	this.data.rect[id].hover = false;
    },
    onRectMouseClick: function(x, y, thH, h, w) {
    	var id = this.isMouseOn(x, y, thH, h, w);
    	if (!id) return;    
    	if (this.select_id) this.data.rect[this.select_id].select = false;
    	this.select_id = id;
    	this.data.rect[id].select = true;
    	this.select_day = this.data.rect[id].year + "/" + this.data.rect[id].month + "/" + this.data.rect[id].day;

    	this.trigger(this.data);
    },
    onRectUpdateMonth: function(date, num) {
    	var _date = {
    		year: date.year,
    		month: date.month,
    		date: date.date
    	}    	

		if (_date.month < 1) {
			_date.month = 12;
			_date.year--;
		} else if (_date.month > 12) {
			_date.month = 1;
			_date.year++;
		}

		if (num === 0) {
			_date = new Date();
			_date = {
				year: _date.getFullYear(),
				month: _date.getMonth() + 1,
				date: _date.getDate()
			}
			this.select_day = _date.year+"/"+_date.month+"/"+_date.date;
		}

		this.updateRect(_date);		
    	this.trigger(this.data);
    }
});

module.exports = RectStore;