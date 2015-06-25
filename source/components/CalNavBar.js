var React = require('react');
var Reflux = require('reflux');
var Action = require('../actions/Actions');

var styles = {
	nav: {
		background: "#292929",
		color: "#FFF",
		height: "50px",
		margin: "0 2px 0 2px",
		fontSize: "2em",
		fontWeight: "bold",
		position: "relative",

		display: "-webkit-box",
	    display: "-moz-box",
	    display: "-ms-flexbox",
	    display: "-webkit-flex",
	    display: "flex",
	    WebkitBoxPack: "center",
	    MozBoxPack: "center",
	    msFlexPack: "center",
	    WebkitJustifyContent: "center",
	    justifyContent: "center",
	    WebkitAlignItems: "center",
	    alignItems: "center"
	},
	date: {
		display: "-webkit-box",
	    display: "-moz-box",
	    display: "-ms-flexbox",
	    display: "-webkit-flex",
	    display: "flex",
	    WebkitBoxPack: "center",
	    MozBoxPack: "center",
	    msFlexPack: "center",
	    WebkitJustifyContent: "center",
	    justifyContent: "center",
	    WebkitAlignItems: "center",
	    alignItems: "center"
	},
	select: {
		padding: "0 20px 0 20px",
		cursor: "pointer"
	},
	today: {
		height: "100%",
		position: "absolute",
		right: "10px",
		display: "-webkit-box",
	    display: "-moz-box",
	    display: "-ms-flexbox",
	    display: "-webkit-flex",
	    display: "flex",
	    WebkitBoxPack: "center",
	    MozBoxPack: "center",
	    msFlexPack: "center",
	    WebkitJustifyContent: "center",
	    justifyContent: "center",
	    WebkitAlignItems: "center",
	    alignItems: "center",
	    cursor: "pointer"
	}
}

var CalNavBar = React.createClass({
	changeMonth: function(num) {
		Action.changeMonth(num);
		Action.rectUpdateMonth(this.props.date, num);
	},
	render: function() {
		return (
			<div style={styles.nav}>
				<div style={styles.date}>
					<div style={styles.select} onClick={this.changeMonth.bind(this, -1)} >{"<"}</div>
					<div>{this.props.date.year + " / " + (this.props.date.month)}</div>
					<div style={styles.select} onClick={this.changeMonth.bind(this, 1)} >{">"}</div>
				</div>
				<div style={styles.today} onClick={this.changeMonth.bind(this, 0)} >today</div>
			</div>
		);
	}

});

module.exports = CalNavBar;