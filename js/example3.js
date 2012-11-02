h = 400;
w = 1000;

var svg = d3.select("body").append("svg").
	attr("width", w)
	.attr("height", h)
	.attr("class", "board");

data = []
for (var i = 0; i < 10; i++) {
	data[i] = {
		x: Math.random() * w,
		y: Math.random() * h,
	}
};

 var circle = svg.selectAll("circle")
    .data(data);

circle.enter().append("circle")
    .attr("r", 0)
  .transition()
  	.duration(1000)
    .attr("r", 10);

svg.selectAll("text")
	.data(data)
	.enter().append("text")
    .attr("x", function(d) { return d.x + 6; })
    .attr("y", function(d) { return d.y - 6; })
    .style("color", "black")
    .text(function(d) {
        return parseInt(d.x) + ", " + parseInt(d.y);
   });

circle
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y; });

circle.exit().remove();