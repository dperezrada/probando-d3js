
h = 700;
w = 1000;
zoom = 14;
auto_zoom = true;

// 450x250

max_size = 1280;
map_diff = {
	14: {
		'long': 0.0275,
		'lat': 0.0229
	}
}
var mult = 2;
for (var i = 13; i > 0; i--) {
	map_diff[i] = {
		'long': mult*map_diff[14]['long'],
		'lat': mult*map_diff[14]['lat']
	}
	mult = mult*2;
};

function get_map(data){

	diff_long = w*map_diff[zoom]['long']/max_size;
	diff_lat = h*map_diff[zoom]['lat']/max_size;

	var latitudes = _.map(data, function(colegio){ return colegio.latitud; });
	var longitudes = _.map(data, function(colegio){ return colegio.longitud; });

	var max = {
		'lat': _.max(latitudes),
		'long': _.min(longitudes)
	}
	var min = {
		'lat': _.min(latitudes),
		'long': _.max(longitudes)
	}

	center = [
		(min['lat']+max['lat'])/2,
		(min['long']+max['long'])/2,
	]

	if(
		auto_zoom &&
		(
			Math.abs(center[1] - min['long']) > diff_long ||
			Math.abs(center[1] - max['long']) > diff_long ||
			Math.abs(center[0] - min['lat']) > diff_lat ||
			Math.abs(center[0] - max['lat']) > diff_lat
		)
	){
		zoom--;
		if(zoom < 0){
			return null;
		}
		return get_map(data);
	}

	
	return "http://maps.googleapis.com/maps/api/staticmap?center="+center[0]+","+center[1]+"&zoom="+zoom+"&size="+(w/2)+"x"+(h/2)+"&scale=2&sensor=false&style=weight:0.5";
}

$.ajax({
  url: 'data/psu.json',
  type: 'GET',
  dataType: 'json',
  success: function(data, textStatus, xhr) {
  	var map_url = get_map(data);
  	draw(map_url, data);
  },
  error: function(xhr, textStatus, errorThrown) {
  }
});


function draw(map_url, data){

var svg = d3.select("body").append("svg").
	attr("width", w)
	.attr("height", h)
	.attr("class", "map")
	.style("background-image", "url("+map_url+")");

var x = d3.scale.linear()
	.domain([center[1]-diff_long, center[1]+diff_long])
	.range([0, w]);

var y = d3.scale.linear()
.domain([center[0]-diff_lat, center[0]+diff_lat])
.rangeRound([0, h]);

var radius = d3.scale.linear()
.domain([450, 800])
.rangeRound([1, 5]);

	data.sort(function(a, b) {
	    return b.psu_mat_leng - a.psu_mat_leng;
	});

	var hover_circle = function() {
			var circle = d3.select(this);
			circle.transition().duration(500)
				.attr("r", function(d, i) { return radius(d.psu_mat_leng) + 10; })
			
			var data_colegio = circle[0][0].__data__;
			var info_colegio = $("#info_colegio");
			info_colegio.html("<h2>"+circle.attr("colegio")+".- "+data_colegio.nombre_establecimiento+"</h2>")


			var datos = [
				"rbd","dependencia","alumnos_psu","psu_lenguaje","psu_matematica",
				"psu_nem","alumnos_psu_lenguaje","alumnos_psu_matematica","alumnos_psu_nem"
			]

			$.each(datos, function(i, key){
				info_colegio.append("<p>"+key+": "+data_colegio[key]+"</p>")
			})

			$("#lista_colegios").hide();
			info_colegio.show();
		}

	var hover_out_circle = function() {
			var circle = d3.select(this);
			circle.transition().duration(500)
				.attr("r", function(d, i) { return radius(d.psu_mat_leng); })
			
			$("#lista_colegios").show();
			$("#info_colegio").hide();
			
		}

			svg.selectAll("circle")
				.data(data)
				.enter().append("circle")
					.attr("class", "colegio")
					.attr("cx", function(d, i) { return x(d.longitud); })
					.attr("cy", function(d, i) { return h - y(d.latitud); })
					.attr("r", function(d,i){return radius(d.psu_mat_leng);})
					.style("fill", "steelblue")
					.attr("colegio", function(d, i) { return i;})
					.attr("rbd", function(d, i) { return d.rbd;})
					.on("mouseover", hover_circle)
					.on("mouseout", hover_out_circle);

			svg.selectAll("text")
				.data(data)
				.enter().append("text")
					.attr("class", "text_colegio")
					.attr("x", function(d, i) { return x(d.longitud); - 10})
					.attr("y", function(d, i) { return h - y(d.latitud) - 10; })
					.text(function(d, i){return i+1;})


	var list = d3.select("body").append("div")
				.style("width", 250)
				.style("height", 600)
				.style("float", "right")
				.style("overflow", "scroll")
				.attr("id", "lista_colegios")

	var info_colegio = d3.select("body").append("div")
				.style("width", 250)
				.style("height", 600)
				.style("float", "right")
				.style("overflow", "scroll")
				.style("display", "none")
				.attr("id", "info_colegio")

	list.selectAll("p").data(data)
		.enter().append("p")
		.text(function(d,i){
			return (i+1)+".- "+d.nombre_establecimiento;
		})
		.attr("id", function(d, i){return "colegio"+i;})
		.style("background-color", "#FFF")
		.on("mouseover", function(d,i){
			var circle = d3.selectAll("circle").filter(function(data) {return data.rbd === d.rbd; });
			var data_colegio = circle[0][0].__data__; 
			var new_circle = svg.selectAll("nada")
				.data([1])
				.enter().append("circle")
				.attr("cx", function(d, i) { return x(data_colegio.longitud); })
				.attr("cy", function(d, i) { return h - y(data_colegio.latitud); })
				.attr("r", 1)
  			
  		new_circle.transition()
  			.duration(500)
  			.attr("r",10)
  			.attr("fill", "bluesteel")
  			.each("end",function() { 
    			d3.select(this).       // so far, as above
      		remove();            // we delete the object instead 
   			});
		})

}