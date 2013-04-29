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
		var active_layer = 'tout';
		
	    var layerUrl = 'http://dai.cartodb.com/api/v1/viz/ag_survey_11_12/viz.json';

	    var layerOptions = {
	        query: "SELECT * FROM {{table_name}} WHERE " + active_layer + ">0 AND year=" + currentyear,
	        tile_style: "Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[" + active_layer + "<=1]{marker-fill:#CCDDFF;}[" + active_layer + ">1][" + active_layer + "<=1.5]{marker-fill:#6677B1;}[" + active_layer + ">1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[" + active_layer + "<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[" + active_layer + ">1][" + active_layer + "<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[" + active_layer + ">1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}"
		}

		var layers = [];
	    var LayerActions = {

	        //Crops

	        autres: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE autres>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[autres<=1]{marker-fill:#CCDDFF;}[autres>1][autres<=1.5]{marker-fill:#6677B1;}[autres>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[autres<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[autres>1][autres<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[autres>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			bett: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE bett>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[bett<=1]{marker-fill:#CCDDFF;}[bett>1][bett<=1.5]{marker-fill:#6677B1;}[bett>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[bett<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[bett>1][bett<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[bett>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			ble: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE ble>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[ble<=1]{marker-fill:#CCDDFF;}[ble>1][ble<=1.5]{marker-fill:#6677B1;}[ble>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[ble<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[ble>1][ble<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[ble>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			canal: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE canal>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[canal<=1]{marker-fill:#CCDDFF;}[canal>1][canal<=1.5]{marker-fill:#6677B1;}[canal>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[canal<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[canal>1][canal<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[canal>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			clem: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE clem>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[clem<=1]{marker-fill:#CCDDFF;}[clem>1][clem<=1.5]{marker-fill:#6677B1;}[clem>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[clem<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[clem>1][clem<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[clem>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			eau: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE eau>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[eau<=1]{marker-fill:#CCDDFF;}[eau>1][eau<=1.5]{marker-fill:#6677B1;}[eau>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[eau<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[eau>1][eau<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[eau>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			foret: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE foret>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[foret<=1]{marker-fill:#CCDDFF;}[foret>1][foret<=1.5]{marker-fill:#6677B1;}[foret>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[foret<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[foret>1][foret<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[foret>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			fourr: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE fourr>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[fourr<=1]{marker-fill:#CCDDFF;}[fourr>1][fourr<=1.5]{marker-fill:#6677B1;}[fourr>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[fourr<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[fourr>1][fourr<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[fourr>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			fruitd: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE fruitd>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[fruitd<=1]{marker-fill:#CCDDFF;}[fruitd>1][fruitd<=1.5]{marker-fill:#6677B1;}[fruitd>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[fruitd<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[fruitd>1][fruitd<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[fruitd>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			fruits: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE fruits>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[fruits<=1]{marker-fill:#CCDDFF;}[fruits>1][fruits<=1.5]{marker-fill:#6677B1;}[fruits>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[fruits<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[fruits>1][fruits<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[fruits>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			habi: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE habi>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[habi<=1]{marker-fill:#CCDDFF;}[habi>1][habi<=1.5]{marker-fill:#6677B1;}[habi>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[habi<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[habi>1][habi<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[habi>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			incul: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE incul>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[incul<=1]{marker-fill:#CCDDFF;}[incul>1][incul<=1.5]{marker-fill:#6677B1;}[incul>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[incul<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[incul>1][incul<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[incul>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			jache: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE jache>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[jache<=1]{marker-fill:#CCDDFF;}[jache>1][jache<=1.5]{marker-fill:#6677B1;}[jache>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[jache<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[jache>1][jache<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[jache>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			legum: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE legum>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[legum<=1]{marker-fill:#CCDDFF;}[legum>1][legum<=1.5]{marker-fill:#6677B1;}[legum>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[legum<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[legum>1][legum<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[legum>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			luze: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE luze>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[luze<=1]{marker-fill:#CCDDFF;}[luze>1][luze<=1.5]{marker-fill:#6677B1;}[luze>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[luze<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[luze>1][luze<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[luze>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			mais: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE mais>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[mais<=1]{marker-fill:#CCDDFF;}[mais>1][mais<=1.5]{marker-fill:#6677B1;}[mais>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[mais<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[mais>1][mais<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[mais>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			marai: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE marai>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[marai<=1]{marker-fill:#CCDDFF;}[marai>1][marai<=1.5]{marker-fill:#6677B1;}[marai>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[marai<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[marai>1][marai<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[marai>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			navel: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE navel>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[navel<=1]{marker-fill:#CCDDFF;}[navel>1][navel<=1.5]{marker-fill:#6677B1;}[navel>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[navel<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[navel>1][navel<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[navel>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			oliv: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE oliv>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[oliv<=1]{marker-fill:#CCDDFF;}[oliv>1][oliv<=1.5]{marker-fill:#6677B1;}[oliv>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[oliv<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[oliv>1][oliv<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[oliv>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			orge: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE orge>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[orge<=1]{marker-fill:#CCDDFF;}[orge>1][orge<=1.5]{marker-fill:#6677B1;}[orge>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[orge<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[orge>1][orge<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[orge>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			oued: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE oued>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[oued<=1]{marker-fill:#CCDDFF;}[oued>1][oued<=1.5]{marker-fill:#6677B1;}[oued>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[oued<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[oued>1][oued<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[oued>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			parc: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE parc>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[parc<=1]{marker-fill:#CCDDFF;}[parc>1][parc<=1.5]{marker-fill:#6677B1;}[parc>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[parc<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[parc>1][parc<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[parc>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			pdt: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE pdt>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[pdt<=1]{marker-fill:#CCDDFF;}[pdt>1][pdt<=1.5]{marker-fill:#6677B1;}[pdt>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[pdt<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[pdt>1][pdt<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[pdt>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
	            return true;
	        },
			
			tout: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE tout>0 AND year=" + currentyear);
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[tout<=1]{marker-fill:#CCDDFF;}[tout>1][tout<=1.5]{marker-fill:#6677B1;}[tout>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[tout<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-1.png');}[tout>1][tout<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-2.png');}[tout>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue-3.png');}marker-width:20;}}");
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

	        var new_url = base_url + $(this).attr('id') + '/index.html#' + zoom + '/' + lat + '/' + lon;

	        $(this).attr("href", new_url);
	    });
//To redraw layers with the year attribute passed into layer.setQuery()		
		$('.year').click(function () {
			$('.year').removeClass('active');
			$(this).addClass('active');
			LayerActions[active_layer]();
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