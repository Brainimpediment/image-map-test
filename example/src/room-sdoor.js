var React = require("react");
var ReactDOM = require("react-dom");
var ImageMapper = require("react-image-mapper");

var MAP = {
	name: "sdoor-map",
	areas: [
		{
			name: "1",
			shape: "poly",
			coords: [324,16,295,16,295,-1,324,-1,324,16],
			preFillColor: "rgb(255,255,255,0.3)",
			href: "https://github.com/coldiary/react-image-mapper"
		},
		{
			name: "2",
			shape: "poly",
			coords: [2,315,681,315,681,385,2,385,2,315],
			preFillColor: "rgb(255,255,255,0.3)",
			lineWidth: 3,
			strokeColor: "#000d0b"
		},
		{
			name: "3",
			shape: "poly",
			coords: [619,232,644,232,644,342,619,342,619,232],
			preFillColor: "rgb(255,255,255,0.3)",
			lineWidth: 3,
			strokeColor: "#000d0b"
		}
	]
};

var URL = "https://i.imgur.com/R52G9pR.png";

var App = React.createClass({
	getInitialState() {
		return { hoveredArea: null, msg: null, moveMsg: null };
	},
	load() {
		this.setState({ msg: "how do i make it point to a url...new image...like what" });
	},
	clicked(area) {
		this.setState({
			msg: console.log(`You clicked ${area.shape} ${area.name}!`),
			href: 'https://github.com/coldiary/react-image-mapper'
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
