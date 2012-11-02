w = 500;
h = 500;
data = [32, 57, 112];
x = d3.scale.ordinal().domain([57, 32, 112]).rangePoints([0, w], 1),
	y = d3.scale.ordinal().domain(data).rangePoints([0, h], 2);

var svg = d3.select("#chart-2").append("svg")
	.attr("width", w)
			.attr("height", h);

	svg.selectAll(".nada")
			.data(data)
		.enter().append("circle")
			.attr("class", "little")
			.attr("cx", x)
			.attr("cy", y)
			.attr("r", 12)
			.style("fill", "steelblue");

		var circle = svg.selectAll("circle");

	circle.transition().duration(500).delay(500).attr("cy", function() {
		return Math.random() * h;
});
	circle.transition().duration(500).delay(1000).attr("r", 30);
	circle.transition().duration(500).delay(2000).attr("cx", function() {
		return Math.random() * w;
});

circle.attr("cx", function(d, i) {
	console.log(i);
	console.log(d);
	return i * 100 + 30;
});