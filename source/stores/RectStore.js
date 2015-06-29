var React = require('react/addons');
var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var RectStore = Reflux.createStore({
	listenables: Actions,
	init: function() {
		this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		this.weeks = ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'];
		this.select_id = null;
		this.hover_id = null;
		this.select_day = null;
		this.date = null;

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
	updateRect: function() {
		var month = this.date.month;
		var day = this.date.date;
		var year = this.date.year;

		var days = this.daysInMonth(year, month);		
		var oneOfMonth = new Date(this.months[month - 1]+' 1, '+year);
		var firstDay = oneOfMonth.getDay() + 7;
		
		var newData = {
			ctx: this.data.ctx,
			rect: []
		};

		var ind = 1;		
		for (var i = 0; i < 49; i++) {
			var temp = {};
			this.data.rect[i].year = year;
			this.data.rect[i].month = month;
			this.data.rect[i].day = false;
			this.data.rect[i].select = false;
			this.data.rect[i].hover = false;
			if ((!this.select_day && ind == day) || (year+"/"+month+"/"+ind) == this.select_day) {
				this.select_day = year+"/"+month+"/"+ind;
				this.select_id = i;
				this.data.rect[i].select = true;
			}
			if (i >= firstDay && ind <= days) {
				this.data.rect[i].day = ind;
				ind++;
			}
			if (i < 7) {
				this.data.rect[i].day = this.weeks[i];
			}

			temp.year = this.data.rect[i].year;
			temp.month = this.data.rect[i].month;
			temp.day = this.data.rect[i].day;
			temp.select = this.data.rect[i].select;
			temp.hover = this.data.rect[i].hover;
			temp.type = this.data.rect[i].type;
			temp.bg = this.data.rect[i].bg;
			temp.posX = this.data.rect[i].posX;
		 	temp.posY = this.data.rect[i].posY;
		 	temp.width = this.data.rect[i].width;
		 	temp.height = this.data.rect[i].height;
		 	temp.id = this.data.rect[i].id;
			newData.rect.push(temp);
		}
		return newData;
	},
	cloneObj: function(data, id) {
		if (id) {
			data.rect[id] = React.addons.update(data.rect[id], {
			      $merge: {}
		    });
		    return data;
		}

		var newData = React.addons.update(data, {
		      $merge: {}
	    });
	    return newData;
	},
    onSetRectInfo: function(data) {
    	this.data.rect = data;
    },
	onInitRect: function(ctx) {
		this.data.ctx = ctx;
		var newData = this.updateRect();

		this.trigger(newData);
	},
    onRectMouseMove: function(x, y, thH, h, w) {
    	var id = this.isMouseOn(x, y, thH, h, w);
    	if (!id) return;

    	var newData = this.cloneObj(this.data);
	 	newData = this.cloneObj(newData, id);

	 	if (this.hover_id) {
		    newData = this.cloneObj(newData, this.hover_id);
    		newData.rect[this.hover_id].hover = false;
    	}
    	this.hover_id = id;
    	
    	newData.rect[id].hover = true;
    	this.trigger(newData);
    },
    onRectMouseClick: function(x, y, thH, h, w) {
    	var id = this.isMouseOn(x, y, thH, h, w);
    	if (!id) return;  

    	var newData = this.cloneObj(this.data);
	 	newData = this.cloneObj(newData, id);
    	
    	if (this.select_id) {
    		newData = this.cloneObj(newData, this.select_id);
    		newData.rect[this.select_id].select = false;
    	}
    	this.select_id = id;
    	newData.rect[id].select = true;
    	this.select_day = newData.rect[id].year + "/" + newData.rect[id].month + "/" + newData.rect[id].day;

    	this.trigger(newData);
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

		this.date = _date;
		var newData = this.updateRect();
    	this.trigger(newData);
    }
});

module.exports = RectStore;