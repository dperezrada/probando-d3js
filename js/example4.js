
		h = 886;
		w = 1000;

		max_size = 1280;
		max_diff_long = 0.0275;
		max_diff_lat = 0.0229;

		diff_long = w*max_diff_long/max_size;
		diff_lat = h*max_diff_lat/max_size;

		center = [-33.43291811,-70.60911233];
		map_url = "http://maps.googleapis.com/maps/api/staticmap?center="+center[0]+","+center[1]+"&zoom=14&size="+(w/2)+"x"+(h/2)+"&scale=2&sensor=false&style=weight:0.5";

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
		.rangeRound([1, 20]);


		data = [
			{'lat': -33.43291811, 'nombre': 'TECNICO  PORTEZUELO', 'long': -70.60811233, 'psu': 503},
			{'lat': -33.43200859, 'nombre': 'COLEGIO LATINOAMERICANO DE INTEGRACION', 'long': -70.60173882, 'psu': 526},
			{'lat': -33.43914861, 'nombre': 'COLEGIO ALMAHUE', 'long': -70.6005362, 'psu': 528},
			{'lat': -33.44080841, 'nombre': 'WEXFORD COLLEGE N 2', 'long': -70.62614672, 'psu': 529},
			{'lat': -33.41779241, 'nombre': 'LICEO B 42 TAJAMAR', 'long': -70.60477922, 'psu': 548},
			{'lat': -33.44033841, 'nombre': 'COLEGIO  UNITED COLLEGE', 'long': -70.62760088, 'psu': 551},
			{'lat': -33.43709588, 'nombre': 'COLEGIO CAMPUS COLLEGE', 'long': -70.61556837, 'psu': 557},
			{'lat': -33.4400687, 'nombre': 'COLEGIO SUPERIOR CAMBRIDGE', 'long': -70.62959662, 'psu': 561},
			{'lat': -33.44642755, 'nombre': 'LICEO POLIVALENTE ARTURO ALESSANDRI P.', 'long': -70.63021039, 'psu': 562},
			{'lat': -33.43397199, 'nombre': 'COLEGIO MARIA INMACULADA', 'long': -70.63236525, 'psu': 571},
			{'lat': -33.44281264, 'nombre': 'COLEGIO PARTICULAR REGINA PACIS', 'long': -70.59613925, 'psu': 576},
			{'lat': -33.43537885, 'nombre': 'COLEGIO KENDAL ENGLISH SCHOOL', 'long': -70.5907325, 'psu': 577},
			{'lat': -33.4440632, 'nombre': 'COLEGIO DE LOS SAGRADOS CORAZONES PROVIDENCIA', 'long': -70.59426885, 'psu': 585},
			{'lat': -33.42548394, 'nombre': 'COLEGIO INSTITUTO DE HUMANIDADES LUIS CAMPINO', 'long': -70.61112644, 'psu': 601},
			{'lat': -33.4375901, 'nombre': 'COLEGIO COMPANIA DE MARIA-SEMINARIO', 'long': -70.63017415, 'psu': 601},
			{'lat': -33.43062804, 'nombre': 'COL.  PART. SALES. EL PATROCINIO DE SAN JOSE', 'long': -70.62879629, 'psu': 603},
			{'lat': -33.4299375, 'nombre': 'LICEO JOSE VICTORINO LASTARRIA', 'long': -70.62162017, 'psu': 605},
			{'lat': -33.42418757, 'nombre': 'LICEO DE NI\xc3\x91AS N 7 LUISA SAAVEDRA DE GONZALEZ', 'long': -70.61372669, 'psu': 608},
			{'lat': -33.42714673, 'nombre': 'COLEGIO UNIVERSITARIO INGLES', 'long': -70.62193394, 'psu': 608},
			{'lat': -33.43949248, 'nombre': 'COLEGIO MARIANO', 'long': -70.59764893, 'psu': 631},
			{'lat': -33.43982548, 'nombre': 'COLEGIO THE ENGLISH INSTITUTE', 'long': -70.60259243, 'psu': 648},
			{'lat': -33.42969974, 'nombre': 'COLEGIO CAMBRIDGE COLLEGE', 'long': -70.61634552, 'psu': 651},
			{'lat': -33.44035186, 'nombre': 'COLEGIO PEDRO DE VALDIVIA', 'long': -70.60651763, 'psu': 652},
			{'lat': -33.43579491, 'nombre': 'COLEGIO PART. JOSEFINO SANTISIMA TRINIDAD', 'long': -70.618513, 'psu': 654},
			{'lat': -33.44347901, 'nombre': 'LICEO CARMELA CARVAJAL DE PRAT', 'long': -70.62536825, 'psu': 655},
			{'lat': -33.42617295, 'nombre': 'COLEGIO ALEMAN ST. THOMAS MORUS', 'long': -70.61084879, 'psu': 660},
			{'lat': -33.43464011, 'nombre': "SAINT GABRIEL'S SCHOOL SEDE BILBAO", 'long': -70.58785786, 'psu': 668},
			{'lat': -33.42268386, 'nombre': "COLEGIO TREWHELA'S ENGLISH SCHOOL", 'long': -70.59752374, 'psu': 673},
			{'lat': -33.4422862, 'nombre': 'COLEGIO THE KENT SCHOOL', 'long': -70.60617679, 'psu': 675},
			{'lat': -33.42453479, 'nombre': 'COLEGIO SANTIAGO COLLEGE', 'long': -70.60364497, 'psu': 681},
			{'lat': -33.4328756, 'nombre': 'COLEGIO SAN IGNACIO EL BOSQUE', 'long': -70.59464504, 'psu': 684}
]
data.sort(function(a, b) {
    return b.psu - a.psu;
});

var hover_circle = function() {
		var circle = d3.select(this);
		circle.transition().duration(500)
			.attr("r", function(d, i) { return radius(d.psu) + 10; })
		var colegio_text = d3.select("#colegio"+circle.attr("colegio"));
		colegio_text
			.style("background-color", "#DDD");

	}

var hover_out_circle = function() {
		var circle = d3.select(this);
		circle.transition().duration(500)
			.attr("r", function(d, i) { return radius(d.psu); })
		var colegio_text = d3.select("#colegio"+circle.attr("colegio"));
		colegio_text
			.style("background-color", "#FFF");
	}

		svg.selectAll("circle")
			.data(data)
			.enter().append("circle")
				.attr("class", "colegio")
				.attr("cx", function(d, i) { return x(d.long); })
				.attr("cy", function(d, i) { return h - y(d.lat); })
				.attr("r", function(d,i){return radius(d.psu);})
				.style("fill", "steelblue")
				.attr("colegio", function(d, i) { return i;})
				.on("mouseover", hover_circle)
				.on("mouseout", hover_out_circle);

		svg.selectAll("text")
			.data(data)
			.enter().append("text")
				.attr("class", "text_colegio")
				.attr("x", function(d, i) { return x(d.long); - 10})
				.attr("y", function(d, i) { return h - y(d.lat) - 10; })
				.text(function(d, i){return i+1;})


var list = d3.select("body").append("div")
			.style("width", 250)
			.style("height", h)
			.style("float", "right")
			.attr("class", "list")

list.selectAll("p").data(data)
	.enter().append("p")
	.text(function(d,i){
		return (i+1)+".- "+d.nombre;
	})
	.attr("id", function(d, i){return "colegio"+i;})

	