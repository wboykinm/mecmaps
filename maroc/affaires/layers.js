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


	    L.tileLayer('http://a.tiles.mapbox.com/v3/dai.map-jfzz54yc/{z}/{x}/{y}.png', {
	        attribution: 'MapBox'
	    }).addTo(map);

	    var reference = L.tileLayer('http://a.tiles.mapbox.com/v3/landplanner.map-clhq1tp6/{z}/{x}/{y}.png', {
	        attribution: 'Openstreetmap Contributors'
	    });
				
		var currentyear = $('.year.active').attr('id');
		var active_layer = '2011';
		
	    var layerUrl = 'http://dai.cartodb.com/api/v1/viz/mec_business1/viz.json';

	    var layerOptions = {
	        query: "SELECT * FROM mec_business1 WHERE year LIKE '" + currentyear + "'",
	        tile_style: "Map{buffer-size:512;}#{{table_name}}{marker-file:url(http://api.tiles.mapbox.com/v3/marker/pin-m-bank+031148.png);marker-opacity:0.8;marker-allow-overlap:true;}"
		}

		var layers = [];
	    var LayerActions = {

	        //Crops

	        2011: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE year LIKE '2011'");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{marker-file:url(http://api.tiles.mapbox.com/v3/marker/pin-m-bank+031148.png);marker-opacity:0.8;marker-allow-overlap:true;}");
	            return true;
	        },
			
			2012: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE year LIKE '2012'");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{marker-file:url(http://api.tiles.mapbox.com/v3/marker/pin-m-bank+031148.png);marker-opacity:0.8;marker-allow-overlap:true;}");
	            return true;
	        }
				        
	    }
		
	    cartodb.createLayer(map, layerUrl, layerOptions)
	        .on('done', function (layer) {
	        layer.infowindow.set('template', $('#infowindow_template').html());
	        map.addLayer(layer);
	        map.addLayer(reference);

	        layers.push(layer);
	    }).on('error', function () {
	        //log the error
	    });
//To add and remove the reference overlay at the zoom 10 threshold
	    map.on('moveend', function () {
	        if (map.getZoom() > 10 && map.hasLayer(reference)) {
	            map.removeLayer(reference);
	        }
	        if (map.getZoom() <= 10 && map.hasLayer(reference) == false) {
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
//To redraw layers with the year attribute passed into layer.setQuery()		
		$('.year').click(function () {
			$('.year').removeClass('active');
			$(this).addClass('active');
			LayerActions[active_layer]();
			$('#infowindow_template').html();
		});
		
//To redraw layers with the active crop type symbolized
	    $('.lyr').click(function () {
	        $('.lyr').removeClass('active');
	        $(this).addClass('active');
	        $('h2.switch-title').text($(this).text());
			active_layer = $(this).attr('id')
            LayerActions[active_layer]();
	        $('#infowindow_template').html();
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