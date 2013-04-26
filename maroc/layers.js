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
	        center: [33.41310221370827, -5.6689453125],
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


	    L.tileLayer('http://a.tiles.mapbox.com/v3/dai.map-jfzz54yc/{z}/{x}/{y}.png', {
	        attribution: 'MapBox'
	    }).addTo(map);

	    var reference = L.tileLayer('http://a.tiles.mapbox.com/v3/landplanner.map-clhq1tp6/{z}/{x}/{y}.png', {
	        attribution: 'Openstreetmap Contributors'
	    });

	    var layerUrl = 'http://dai.cartodb.com/api/v1/viz/ag_survey_11_12/viz.json';
	    var layerOptions = {
	        query: "SELECT * FROM {{table_name}} WHERE parc>100",
	        tile_style: "Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{marker-fill:#00114B;marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');marker-width:20;}}"
		}

	    var layers = [];
	    var LayerActions = {

	        //Crops

	        autres: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE autres>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[autres<=1]{marker-fill:#CCDDFF;}[autres>1][autres<=1.5]{marker-fill:#6677B1;}[autres>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[autres<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[autres>1][autres<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[autres>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			bett: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE bett>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[bett<=1]{marker-fill:#CCDDFF;}[bett>1][bett<=1.5]{marker-fill:#6677B1;}[bett>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[bett<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[bett>1][bett<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[bett>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			ble: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE ble>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[ble<=1]{marker-fill:#CCDDFF;}[ble>1][ble<=1.5]{marker-fill:#6677B1;}[ble>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[ble<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[ble>1][ble<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[ble>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			canal: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE canal>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[canal<=1]{marker-fill:#CCDDFF;}[canal>1][canal<=1.5]{marker-fill:#6677B1;}[canal>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[canal<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[canal>1][canal<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[canal>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			clem: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE clem>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[clem<=1]{marker-fill:#CCDDFF;}[clem>1][clem<=1.5]{marker-fill:#6677B1;}[clem>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[clem<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[clem>1][clem<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[clem>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			eau: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE eau>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[eau<=1]{marker-fill:#CCDDFF;}[eau>1][eau<=1.5]{marker-fill:#6677B1;}[eau>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[eau<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[eau>1][eau<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[eau>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			foret: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE foret>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[foret<=1]{marker-fill:#CCDDFF;}[foret>1][foret<=1.5]{marker-fill:#6677B1;}[foret>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[foret<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[foret>1][foret<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[foret>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			fourr: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE fourr>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[fourr<=1]{marker-fill:#CCDDFF;}[fourr>1][fourr<=1.5]{marker-fill:#6677B1;}[fourr>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[fourr<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[fourr>1][fourr<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[fourr>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			fruitd: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE fruitd>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[fruitd<=1]{marker-fill:#CCDDFF;}[fruitd>1][fruitd<=1.5]{marker-fill:#6677B1;}[fruitd>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[fruitd<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[fruitd>1][fruitd<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[fruitd>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			fruits: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE fruits>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[fruits<=1]{marker-fill:#CCDDFF;}[fruits>1][fruits<=1.5]{marker-fill:#6677B1;}[fruits>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[fruits<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[fruits>1][fruits<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[fruits>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			habi: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE habi>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[habi<=1]{marker-fill:#CCDDFF;}[habi>1][habi<=1.5]{marker-fill:#6677B1;}[habi>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[habi<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[habi>1][habi<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[habi>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			incul: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE incul>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[incul<=1]{marker-fill:#CCDDFF;}[incul>1][incul<=1.5]{marker-fill:#6677B1;}[incul>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[incul<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[incul>1][incul<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[incul>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			jache: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE jache>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[jache<=1]{marker-fill:#CCDDFF;}[jache>1][jache<=1.5]{marker-fill:#6677B1;}[jache>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[jache<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[jache>1][jache<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[jache>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			legum: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE legum>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[legum<=1]{marker-fill:#CCDDFF;}[legum>1][legum<=1.5]{marker-fill:#6677B1;}[legum>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[legum<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[legum>1][legum<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[legum>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			luze: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE luze>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[luze<=1]{marker-fill:#CCDDFF;}[luze>1][luze<=1.5]{marker-fill:#6677B1;}[luze>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[luze<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[luze>1][luze<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[luze>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			mais: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE mais>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[mais<=1]{marker-fill:#CCDDFF;}[mais>1][mais<=1.5]{marker-fill:#6677B1;}[mais>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[mais<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[mais>1][mais<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[mais>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			marai: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE marai>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[marai<=1]{marker-fill:#CCDDFF;}[marai>1][marai<=1.5]{marker-fill:#6677B1;}[marai>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[marai<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[marai>1][marai<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[marai>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			navel: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE navel>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[navel<=1]{marker-fill:#CCDDFF;}[navel>1][navel<=1.5]{marker-fill:#6677B1;}[navel>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[navel<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[navel>1][navel<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[navel>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			oliv: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE oliv>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[oliv<=1]{marker-fill:#CCDDFF;}[oliv>1][oliv<=1.5]{marker-fill:#6677B1;}[oliv>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[oliv<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[oliv>1][oliv<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[oliv>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			orge: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE orge>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[orge<=1]{marker-fill:#CCDDFF;}[orge>1][orge<=1.5]{marker-fill:#6677B1;}[orge>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[orge<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[orge>1][orge<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[orge>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			oued: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE oued>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[oued<=1]{marker-fill:#CCDDFF;}[oued>1][oued<=1.5]{marker-fill:#6677B1;}[oued>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[oued<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[oued>1][oued<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[oued>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			parc: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE parc>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[parc<=1]{marker-fill:#CCDDFF;}[parc>1][parc<=1.5]{marker-fill:#6677B1;}[parc>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[parc<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[parc>1][parc<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[parc>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			pdt: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE pdt>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[pdt<=1]{marker-fill:#CCDDFF;}[pdt>1][pdt<=1.5]{marker-fill:#6677B1;}[pdt>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[pdt<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[pdt>1][pdt<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[pdt>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
	            return true;
	        },
			
			route: function () {
	            layers[0].setQuery("SELECT * FROM {{table_name}} WHERE route>0");
	            layers[0].setCartoCSS("Map{buffer-size:512;}#{{table_name}}{[zoom<=10]{[route<=1]{marker-fill:#CCDDFF;}[route>1][route<=1.5]{marker-fill:#6677B1;}[route>1.5]{marker-fill:#00114B;}marker-width:20;marker-line-color:#fff;marker-line-width:1;marker-line-opacity:0.4;marker-opacity:0.8;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}[zoom>10]{[route<=1]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1a.png');}[route>1][route<=1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1b.png');}[route>1.5]{marker-file:url('http://geosprocket.com/assets/img/wheatblue1c.png');}marker-width:20;}}");
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

	    map.on('moveend', function () {
	        if (map.getZoom() > 10 && map.hasLayer(reference)) {
	            map.removeLayer(reference);
	        }
	        if (map.getZoom() <= 10 && map.hasLayer(reference) == false) {
	            map.addLayer(reference);
	        }
	    });

	    var hash = new L.Hash(map);

	    var base_url = '../';

	    $('#verts').click(function () {
	        var zoom = map.getZoom(),
	            lat = map.getCenter().lat,
	            lon = map.getCenter().lng;

	        var new_url = base_url + 'verts#' + zoom + '/' + lat + '/' + lon;

	        $(this).attr("href", new_url);
	    });

	    $('.lyr').click(function () {
	        $('.lyr').removeClass('active');
	        $(this).addClass('active');
	        $('h2.switch-title').text($(this).text());
	        $('div.switch-legend').html("  <img src='../img/" + $(this).attr('id') + ".png'>");
			
	        LayerActions[$(this).attr('id')]();
	        $('#infowindow_template').html();
	    })

	}