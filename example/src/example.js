var React = require("react");
var ReactDOM = require("react-dom");
var ImageMapper = require("react-image-mapper");

var MAP = {
	name: "my-map",
	areas: [
		{
			name: "1",
			shape: "poly",
			coords: [438,190,440,235,451,248,457,247,460,210,555,209,555,236,561,248,567,248,570,207,576,207,575,187,438,190],
			preFillColor: "rgb(255,255,255,0.3)",
			lineWidth: 3,
			strokeColor: "#000d0b",
			href: "test.html"
		},
		{
			name: "2",
			shape: "poly",
			coords: [617,115,685,171,685,135,647,113,617,115],
			preFillColor: "rgb(255,255,255,0.3)",
			lineWidth: 3,
			strokeColor: "#000d0b"
		},
		{
			name: "3",
			shape: "poly",
			coords: [245,308,271,281,312,265,349,261,376,261,406,263,430,276,454,295,461,308,461,334,444,346,407,350,291,351,260,347,239,334,245,308],
			preFillColor: "rgb(255,255,255,0.3)",
			lineWidth: 3,
			strokeColor: "#000d0b"
		},
		{
			name: "4",
			shape: "poly",
			coords: [168,26,468,26,468,135,168,135,168,26],
			preFillColor: "rgb(255,255,255,0.3)",
			lineWidth: 3,
			strokeColor: "#000d0b"
		},
		{
			name: "5",
			shape: "poly",
			coords: [0,0,0,331,103,246,99,30,32,1,0,0],
			preFillColor: "rgb(255,255,255,0.3)",
			lineWidth: 3,
			strokeColor: "#000d0b"
		}
	]
};

var URL = "https://i.imgur.com/RlMdF6u.png";

var App = React.createClass({
	getInitialState() {
		return { hoveredArea: null, msg: null, moveMsg: null };
	},
	load() {
		this.setState({ msg: "how do i make it point to a url...new image...like what" });
	},
	clicked(area) {
		this.setState({
			msg: console.log(`You clicked ${area.shape} ${area.name}!`)
		});
	},
	clickedOutside(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			// msg: console.log(`You clicked on the image at coords ${JSON.stringify(coords)} !`)
		});
	},
	moveOnImage(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			// moveMsg: console.log(`You moved on the image at coords ${JSON.stringify(coords)} !`)
		});
	},
	enterArea(area) {
		this.setState({
			hoveredArea: area,
			// msg: console.log(`You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
			// 	area.coords
			// )} !`)
		});
	},
	leaveArea(area) {
		this.setState({
			hoveredArea: null,
			// msg: console.log(`You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
			// 	area.coords
			// )} !`)
		});
	},
	moveOnArea(area, evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			// moveMsg: console.log(`You moved on ${area.shape} ${
			// 	area.name
			// } at coords ${JSON.stringify(coords)} !`)
		});
	},

	getTipPosition(area) {
		return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
	},

	render() {
		return (
			<div className="grid">
				<div className="presenter">
					<div style={{ position: "relative" }}>
						<ImageMapper
							src={URL}
							map={MAP}
							width={1000}
							imgWidth={685}
							onLoad={() => this.load()}
							//onClick={area => this.clicked(area)}
							onMouseEnter={area => this.enterArea(area)}
							onMouseLeave={area => this.leaveArea(area)}
							onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
							onImageClick={evt => this.clickedOutside(evt)}
							onImageMouseMove={evt => this.moveOnImage(evt)}
							lineWidth={4}
							strokeColor={"white"}
						/>
						{this.state.hoveredArea && (
							<span
								className="tooltip"
								style={{ ...this.getTipPosition(this.state.hoveredArea) }}
							>
								{this.state.hoveredArea && this.state.hoveredArea.name}
							</span>
						)}
					</div>
					<pre className="message">
						{this.state.msg ? this.state.msg : null}
					</pre>
					<pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById("app"));
