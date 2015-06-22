var React = require('react');
var Reflux = require('reflux');
var RectStore = require('../stores/RectStore');

var Rect = React.createClass({
	mixins: [Reflux.listenTo(RectStore, "reDraw")],

	getInitialState: function() {
        return {
        	ctx: null
        };
    },
	reDraw: function(data) {
		this.setState({ctx: data.ctx, rect: data.rect[this.props.reactKey - 1]});
	},
	render: function() {
		var ctx = this.state.ctx;
		if (ctx == null)
			return false;

		ctx.fillStyle = this.state.rect.bg;
		ctx.fillRect(
			this.state.rect.posX, 
			this.state.rect.posY, 
			this.state.rect.width, 
			this.state.rect.height);

		if (this.state.rect.day) {
			ctx.font = "bold 18px Calibri";
			ctx.fillStyle = '#949494';
			if (this.state.rect.type == 'head') ctx.fillStyle = '#FFF';
			ctx.fillText(this.state.rect.day, this.state.rect.posX + 10, this.state.rect.posY + 20);
		}

		return null;
	}
});

module.exports = Rect;