	//Geocoder parameters

	function getURLParameter(name) {
	    return decodeURI(
	    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ])[1]);
	}

	var regionParameter = getURLParameter('region');
	var region = (regionParameter === 'undefined') ? '' : regionParameter;

	var map;

	function init() {
	    // initiate leaflet map    
	    map = new L.Map('map', {
	        center: [33.8172, -5],
	        zoom: 7,
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
	    //var reference = L.tileLayer('http://a.tiles.mapbox.com/v3/landplanner.map-clhq1tp6/{z}/{x}/{y}.png', {
	        attribution: 'Openstreetmap Contributors'
	    //});
		
		//Define the crop type layer and year by which buttons are active
		var current_year = $('.year.active').attr('id');
		var active_layer = $('.lyr.active').attr('id');;
		
		//Define the CartoDB Table
	    var layerUrl = 'http://dai.cartodb.com/api/v1/viz/grant_gis2/viz.json';

		//Set SQL and CartoCSS parameters for the initial page load
	    var layerOptions = {
	        query: "SELECT * FROM {{table_name}} WHERE layer = '" + active_layer + "'",
	        tile_style: "Map{buffer-size:512;}#{{table_name}}{[layer='grant']{marker-file:url(http://api.tiles.mapbox.com/v3/marker/pin-m-park2+6a4a00.png);}[layer='meteo']{marker-file:url(http://api.tiles.mapbox.com/v3/marker/pin-m-triangle+031148.png);}marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}"
		}

		//Define layers array so you can put it through a julienne slicer later
		var layers = [];
		
		//Load the CartoDB layer between the mapbox layers, with a popup template
	    cartodb.createLayer(map, layerUrl, layerOptions)
	        .on('done', function (layer) {
	        layer.infowindow.set('template', $('#infowindow_template').html());
	        map.addLayer(layer);
			layers.push(layer);
	        //map.addLayer(reference);
	        
	    }).on('error', function () {
	        //log the error
	    });

		//Set the layer parameters in a function that reloads the map,
		//populated with the new "year" and "layer" selectors
		function updateQuery() {
			layers[0].setOptions ({
	        query: "SELECT * FROM {{table_name}} WHERE layer = '" + active_layer + "'",
	        tile_style: "Map{buffer-size:512;}#{{table_name}}{[layer='grant']{marker-file:url(http://api.tiles.mapbox.com/v3/marker/pin-m-park2+6a4a00.png);}[layer='meteo']{marker-file:url(http://api.tiles.mapbox.com/v3/marker/pin-m-triangle+031148.png);}marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}"
		});
		}
		
		
		//To add and remove the reference overlay at the zoom 7 threshold
	    //map.on('moveend', function () {
	    //    if (map.getZoom() > 7 && map.hasLayer(reference)) {
	     //       map.removeLayer(reference);
	    //    }
	     //   if (map.getZoom() <= 7 && map.hasLayer(reference) == false) {
	    //        map.addLayer(reference);
	    //    }
	    //});
		
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
			updateQuery();
		});
		
		//THEMATIC FILTER #2: CROP TYPE
		//To redraw layers with the active crop type symbolized
	    $('.lyr').click(function () {
	        $('.lyr').removeClass('active');
	        $(this).addClass('active');
	        $('h2.switch-title').text($('.lyr.active').text() + ", " + $('.year.active').text());
			active_layer = $(this).attr('id')
            updateQuery();
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