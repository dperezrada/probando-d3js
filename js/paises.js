banderas =  {
	"SUIZA": "http://flagpedia.net/data/flags/normal/ch.png",
	"VENEZUELA": "http://flagpedia.net/data/flags/normal/ve.png",
	"ISRAEL": "http://flagpedia.net/data/flags/normal/il.png",
	"PARAGUAY": "http://flagpedia.net/data/flags/normal/py.png",
	"ECUADOR": "http://flagpedia.net/data/flags/normal/ec.png",
	"ITALIA": "http://flagpedia.net/data/flags/normal/it.png",
	"URUGUAY": "http://flagpedia.net/data/flags/normal/uy.png",
	"AUSTRALIA": "http://flagpedia.net/data/flags/normal/au.png",
	"MEXICO": "http://flagpedia.net/data/flags/normal/mx.png",
	"CANADA": "http://flagpedia.net/data/flags/normal/ca.png",
	"COLOMBIA": "http://flagpedia.net/data/flags/normal/co.png",
	"INGLATERRA": "http://flagpedia.net/data/flags/normal/gb.png",
	"ESPANA": "http://flagpedia.net/data/flags/normal/es.png",
	"FRANCIA": "http://flagpedia.net/data/flags/normal/fr.png",
	"ALEMANIA": "http://flagpedia.net/data/flags/normal/de.png",
	"EEUU": "http://flagpedia.net/data/flags/normal/us.png",
	"BRASIL": "http://flagpedia.net/data/flags/normal/br.png",
	"PERU": "http://flagpedia.net/data/flags/normal/pe.png",
	"BOLIVIA": "http://flagpedia.net/data/flags/normal/bo.png",
	"ARGENTINA": "http://flagpedia.net/data/flags/normal/ar.png"
}

w = 1200;
h = 300;
month = "enero";

var svg = d3.select("body").append("svg")
	.attr("width", w)
	.attr("height", h);

var x, y, data;

var prepare = function(json){
	data = json;
 	data.sort(function(a,b){return a[month] - b[month];})
 	data = data.slice(data.length - 20, data.length)
 	y = d3.scale.linear()
 		.domain([0, 9000000])
 		.range([0, h]);
 	x = d3.scale.linear()
 		.domain([0, data.length])
 		.range([0, w]);
}

var draw = function(){
	var each_width = ((w - 100)/data.length);
	var rectangle = svg.selectAll("rect")
	    .data(data)
	    .enter().append("rect")
	    .attr("x", function(d, i){return x(i);})
	    .attr("y", function(d, i){return h - y(d['enero']) - 100;})
	    .attr("height", function(d, i){return y(d['enero']);})
	    .attr("width", ((w - 100)/data.length))
	    .style("fill", function(d, i){
	    	return "#CCC"
	    	return "url("+banderas[d.pais]+")";
	    })
	
	var show_text = function(){
    	var country = d3.select(this);
    	var country_data = country[0][0].__data__;
    	svg.select("#country_name").text(country_data.pais);
    };

	var images = svg.selectAll("image")
	    .data(data)
	    .enter().append("image")
      		.attr("xlink:href", function(d, i ){
      			return banderas[d.pais];})
      		.attr("x", function(d, i){return x(i);})
      		.attr("y", function(d, i){return h - 90})
	    	.attr("height", function(d, i){return 35})
	    	.attr("width", each_width)
	    	.on("mouseover", show_text);

	var texts = svg.append("svg:text")
		.attr("id", "country_name")
      	.attr("x", 0)
      	.attr("y", 50)
      	.style("color", "#AAA")
      	.style("font-size", "60px");
}



var data = [];

d3.json("./data/llegada_2012.json", function(json) {
	prepare(json);
	draw();
});