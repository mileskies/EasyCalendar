var React = require('react');
var Reflux = require('reflux');
var Action = require('../actions/Actions');
var Rect = require('./Rect');

var YiZCal = React.createClass({
	getInitialState: function() {
		var width = document.getElementById('YiZCal').offsetWidth;
		var height = document.getElementById('YiZCal').offsetHeight;
		var thH = (height - 14) / 9;
		var avgW = (width - 16) / 7;
		var	avgH = (height - thH - 14) / 5;
		var date = new Date();
		return {
			width: width,
			height: height,
			avgW: avgW,
			avgH: avgH,
			thH: thH,
			date: date
		}
	},
	calInit: function() {		
		var rects = [];
		var color = "#A6A9AE";
		var type = "head";
		var width = this.state.avgW;
		var height = this.state.avgH;
		var x = 2, y = 2;
		for (var i = 1; i <= 42; i++) {
			height = (i > 7) ? this.state.avgH : this.state.thH;
			type = (i > 7) ? "content" : type;
			color = (i > 7) ? "#ECF1F4" : color;

			rects.push(<Rect reactKey={i} key={i} />);
			var data = {
				type: type,
				bg: color,
				posX: x,
			 	posY: y,
			 	width: width,
			 	height: height,
			 	id: i
			};
			Action.setRectInfo(data);
			
			if (i % 7 == 0) {
				x = 2;
				y += (height + 2);
			} else {
				x += (width + 2);
			}
		}
		return rects;
	},
	componentWillMount: function() {
	},
	componentDidMount: function() {
		var _this = this;
		var cal = React.findDOMNode(this.refs.canvas);
		var ctx = cal.getContext('2d');
		Action.initRect(ctx, this.state.date);

		cal.addEventListener('mousemove', function(e) {
			var rect = cal.getBoundingClientRect();
			var x = e.clientX - rect.left;
      		var y = e.clientY - rect.top;
      		Action.rectMouseMove(x, y, _this.state.thH + 3, _this.state.avgH + 2, _this.state.avgW + 2);
		});
	},
	render: function() {		
		return (
			<div>
				<div>
					{this.state.date.getFullYear() + "年" + (this.state.date.getMonth()+1) + "月" + this.state.date.getDate() + "日"}
				</div>
				<canvas id="easyCal" ref="canvas" width={this.state.width} height={this.state.height} >
					{this.calInit()}
				</canvas>
			</div>
		);
	}

});

module.exports = YiZCal;