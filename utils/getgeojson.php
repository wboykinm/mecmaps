// Adapt the parameters below to those of your database. I haven't tested extensively on
// remote pulls, so this script should be hosted on the same server as the DB. Plug in
// the "http://www.myserver.com/getgeojson.php" URL where your client map application
// expects GeoJSON inputs. Thanks to Taoufik Boukdair for figuring out the unique
// indexing issue.

<?php
header('Content-type: text/plain');
$username = "[my username]";
$password = "[my password]";
$hostname = "localhost";	
$database = "[my database]";

// Opens a connection to a mySQL server 
$connection=mysql_connect ($hostname, $username, $password); 
if (!$connection) { 
  die('Not connected : ' . mysql_error()); 
} 

// Set the active mySQL database 
$db_selected = mysql_select_db($database, $connection); 
if (!$db_selected) { 
  die ('Can\'t use db : ' . mysql_error()); 
} 

// json output - insert table name below after "FROM" 
$query = 'SELECT * FROM survey'; 
$dbquery = mysql_query($query); 

if(! $dbquery ) 
{ 
  die('Could not get data: ' . mysql_error()); 
} 

// Parse the dbquery into geojson 
// ================================================ 
// ================================================ 
// Return markers as GeoJSON 
$features = array(); 
$geojson = array( 
    'type'      => 'FeatureCollection', 
    'features'  => $features 
 ); 

while($row = mysql_fetch_assoc($dbquery)) { 
    $feature = array( 
        'type' => 'Feature', 
      'geometry' => array( 
        'type' => 'Point', 
        //Indicate your geometry columns below - note this is currently
        //configured for point geometry.
        'coordinates' => array((float)$row['lon'], (float)$row['lat']) 
            ), 
      'properties' => array( 
      // Call out each data field you'd like parsed into the GeoJSON string,
      // preceding any number fields with "(float)" (Leave this out for 
      // text fields). DB fieldname goes on the right side of the "=>",
      // desired GeoJSON fieldname goes on the left.
            'name' => $row['title'], 
            'clementine' => (float)$row['clementine'],
            'navel' => (float)$row['navel'],
            'betterave' => (float)$row['betterave'],
            'ble' => (float)$row['ble'],
            'orge' => (float)$row['orge'],
            'luzerne' => (float)$row['luzerne'],
            'fourrage' => (float)$row['fourrage'],
            'olivier' => (float)$row['olivier'],
            'fruit_dive' => (float)$row['fruit_dive'],
            'pomme_de_t' => (float)$row['pomme_de_t'],
            'maraichage' => (float)$row['maraichage'],
            'jachere' => (float)$row['jachere'],
            'parcours' => (float)$row['parcours'],
            'habitat' => (float)$row['habitat'],
            'foret' => (float)$row['foret'],
            'canal' => (float)$row['canal'],
            'oued' => (float)$row['oued'],
            'route' => (float)$row['route'],
            'autres' => (float)$row['autres']
        //end without a comma 
            ) 
        ); 
                array_push($features, $feature); 
    
}; 
array_push($geojson, $features); 
mysql_close($connection); 

// // Return parsed result with first index removed 
    header("Content-Type:application/json",true); 
    $outgeojson = json_encode($geojson);
    echo str_replace(":[],\"0\":",":",$outgeojson); 
?> 