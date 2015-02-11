	//Geocoder parameters

	function getURLParameter(name) {
	    return decodeURI(
	    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ])[1]);
	}

	var regionParameter = getURLParameter('region');
	var region = (regionParameter === 'undefined') ? '' : regionParameter;

	var map;

	function main() {
	    // initiate leaflet map    
	    map = new L.Map('map', {
	        center: [34.8172, -2.1849],
	        zoom: 9,
			minZoom: 6,
			maxZoom: 14
	    });

	    //Geocoder controls
	    new L.Control.GeoSearch({
	        provider: new L.GeoSearch.Provider.Google({
	            region: region
	        })
	    }).addTo(map);

		//Define the baselayer and add it to the map (normal terrain: dai.map-jfzz54yc)
	    L.tileLayer('http://a.tiles.mapbox.com/v3/landplanner.map-3xuspbkm/{z}/{x}/{y}.png', {
	        attribution: 'MapBox'
	    }).addTo(map);
		
		//Define the reference overlay (just roads and labels from Mapbox)
	    var reference = L.tileLayer('http://a.tiles.mapbox.com/v3/landplanner.map-clhq1tp6/{z}/{x}/{y}.png', {
	        attribution: 'Openstreetmap Contributors'
	    });
		
		//Define the crop type layer and year by which buttons are active
		var current_year = $('.year.active').attr('id');
		var active_layer = $('.lyr.active').attr('id');

		var vertsTable = 'ag_survey_11_13_all';
		var	cartoStuff = "{[" + active_layer + "<=1]{marker-fill:#CCDDFF;}[" + active_layer + ">1][" + active_layer + "<=1.5]{marker-fill:#6677B1;}[" + active_layer + ">1.5]{marker-fill:#00114B;}marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;[zoom<=10]{marker-width:20;marker-line-color:#00114B;marker-line-width:0.4;}[zoom>10]{marker-width:30;marker-line-color:#00114B;marker-line-width:1.4;}}";
		var	sqlStuff = "SELECT * FROM " + vertsTable + " WHERE " + active_layer + ">0 AND year=" + current_year;

	  // Create viz at runtime:
	  // create a layer with 1 sublayer
	  var layerDef; 
	  cartodb.createLayer(map, {
	    user_name: 'dai',
	    type: 'cartodb',
	    sublayers: [{
	      sql: sqlStuff,
	      cartocss: "#" + vertsTable + " " + cartoStuff,
	      interactivity: 'cartodb_id, name, bett, ble, canal, clem, eau, foret, fourr, fruitd, fruits, habi, incul, jache, legum, luze, mais, marai, navel, oliv, orge, oued, parc, pdt, route, autres'
	    }]
	  })
	  .addTo(map)
	  .done(function(layer) {
	      layerDef = layer.getSubLayer(0);
	      var infowindow = cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['cartodb_id','name','bett','ble','canal','clem','eau','foret','fourr','fruitd','fruits','habi','incul','jache','legum','luze','mais','marai','navel','oliv','orge','oued','parc','pdt','route','autres'])
	      infowindow.model.set('template', function(data) {
	          return _.template($('#infowindow_template').html())(data);
	      });
	  }); // add the layer to our map which already contains 1 sublayer
		
		//To add and remove the reference overlay at the zoom 10 threshold
	    map.on('moveend', function () {
        if (map.getZoom() > 13 && map.hasLayer(reference)) {
            map.removeLayer(reference);
        }
        if (map.getZoom() <= 13 && map.hasLayer(reference) == false) {
            map.addLayer(reference);
        }
	    });
		
		//To construct the nav links with the current location so the map doesn't pan 
		//when a new theme is selected
	    var hash = new L.Hash(map);

	    var base_url = '../';

	    $('.theme').click(function () {
	        var zoom = map.getZoom(),
	            lat = map.getCenter().lat,
	            lon = map.getCenter().lng;

	        var new_url = base_url + $(this).attr('id') + '/#' + zoom + '/' + lat + '/' + lon;

	        $(this).attr("href", new_url);
	    });
		
		//THEMATIC FILTER #1: ACTIVE YEAR
		//To redraw layers with the year attribute passed along		
		$('.year').click(function () {
			$('.year').removeClass('active');
			$(this).addClass('active');
			$('h2.switch-title').text($('.lyr.active').text() + ", " + $('.year.active').text());
			current_year = $(this).attr('id');
			layerDef.setSQL("SELECT * FROM " + vertsTable + " WHERE " + active_layer + ">0 AND year=" + current_year);
			layerDef.setCartoCSS("#" + vertsTable + " " + "{[" + active_layer + "<=1]{marker-fill:#CCDDFF;}[" + active_layer + ">1][" + active_layer + "<=1.5]{marker-fill:#6677B1;}[" + active_layer + ">1.5]{marker-fill:#00114B;}marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;[zoom<=10]{marker-width:20;marker-line-color:#00114B;marker-line-width:0.4;}[zoom>10]{marker-width:30;marker-line-color:#00114B;marker-line-width:1.4;}}");
		});
		
		//THEMATIC FILTER #2: CROP TYPE
		//To redraw layers with the active crop type symbolized
    $('.lyr').click(function () {
      $('.lyr').removeClass('active');
      $(this).addClass('active');
      $('h2.switch-title').text($('.lyr.active').text() + ", " + $('.year.active').text());
			active_layer = $(this).attr('id');
			layerDef.setSQL("SELECT * FROM " + vertsTable + " WHERE " + active_layer + ">0 AND year=" + current_year);
			layerDef.setCartoCSS("#" + vertsTable + " " + "{[" + active_layer + "<=1]{marker-fill:#CCDDFF;}[" + active_layer + ">1][" + active_layer + "<=1.5]{marker-fill:#6677B1;}[" + active_layer + ">1.5]{marker-fill:#00114B;}marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;[zoom<=10]{marker-width:20;marker-line-color:#00114B;marker-line-width:0.4;}[zoom>10]{marker-width:30;marker-line-color:#00114B;marker-line-width:1.4;}}");
    });
		
		//To pan between provinces		
		$('.site').click(function () {
			$('.site').removeClass('active');
			$(this).addClass('active');
			if ($('.site.active').attr('id') == 'doukkala') {
				map.setView([32.8069, -8.3427], 9);
			}
			if ($('.site.active').attr('id') == 'oriental') {
				map.setView([34.8262, -2.2920], 9);
			}
		});

	}

	window.onload = main;