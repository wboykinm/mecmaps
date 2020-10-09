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
	    L.tileLayer('http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
	        attribution: 'Stamen'
	    }).addTo(map);
	
		  var vertsTable = 'mec_business1';
		  var cartoStuff = "{marker-file:url(http://asset.geosprocket.com/img/pin-m-bank+031148.png);marker-allow-overlap:true;}";

		  // Create viz at runtime:
		  // create a layer with 1 sublayer
		  var layerDef; 
		  cartodb.createLayer(map, {
		    user_name: 'dai',
		    type: 'cartodb',
		    sublayers: [{
		      sql: "SELECT * FROM " + vertsTable,
		      cartocss: "#" + vertsTable + " " + cartoStuff,
		      interactivity: 'cartodb_id,name,perm2011,perm2012,ent2011,ent2012,coop2011,coop2012'
		    }]
		  })
		  .addTo(map)
		  .done(function(layer) {
		      layerDef = layer.getSubLayer(0);
		      var infowindow = cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['cartodb_id','name','perm2011','perm2012','ent2011','ent2012','coop2011','coop2012'])
		      infowindow.model.set('template', function(data) {
		          return _.template($('#infowindow_template').html())(data);
		      });
		  }); // add the layer to our map which already contains 1 sublayer
		
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

	};

	window.onload = main;
