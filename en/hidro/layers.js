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
		//var current_year = $('.year.active').attr('id');
		var active_layer = $('.lyr.active').attr('id');
		
		//Define the CartoDB Table
	  var vertsTable = 'hidro1';
		var	cartoStuff = "{[layer='Puits']{marker-fill:#0F3B82;}[layer='Forage']{marker-fill:#C55305;}[layer='Bassin']{marker-fill:#C57F05;}marker-width:20;marker-line-color:#FFF;marker-line-width:2;marker-line-opacity:0.9;marker-opacity:0.9;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}";
		var	sqlStuff = "SELECT * FROM " + vertsTable + " WHERE layer = '" + active_layer + "'";
	
		// Create viz at runtime:
	  // create a layer with 1 sublayer
	  var layerDef; 
	  cartodb.createLayer(map, {
	    user_name: 'dai',
	    type: 'cartodb',
	    sublayers: [{
	      sql: sqlStuff,
	      cartocss: "#" + vertsTable + " " + cartoStuff,
	      interactivity: 'cartodb_id,layer,nume_ire,popup1,popup2,popup3,popup4'
	    }]
	  })
	  .addTo(map)
	  .done(function(layer) {
	      layerDef = layer.getSubLayer(0);
	      var infowindow = cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['cartodb_id','layer','nume_ire','popup1','popup2','popup3','popup4'])
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
		
		//THEMATIC FILTER #2: Feature Type
		//To redraw layers with the active crop type symbolized
	    $('.lyr').click(function () {
	        $('.lyr').removeClass('active');
	        $(this).addClass('active');
	        $('h2.switch-title').text($('.lyr.active').text());
					active_layer = $(this).attr('id')
          layerDef.setSQL("Select * FROM " + vertsTable + " WHERE layer = '" + active_layer + "'");
        	//layerDef.setCartoCSS("#" + vertsTable + " " + layerDeets[0].cartocss);
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