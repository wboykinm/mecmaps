# MECMaps
=======

**Code Base for DAI MEC Mapping portals**

Check out [the wiki](https://github.com/wboykinm/mecmaps/wiki) for the overview and plan of attack. All tools developed in the service of MECMaps will be available here. 

The page architecture calls for a live GeoJSON feed of data. Possible sources of this include:
* [The CartoDB SQL API](http://developers.cartodb.com/documentation/cartodb-apis.html)
* A [directly-parsed pull](https://github.com/wboykinm/mecmaps/blob/master/getgeojson.php) from a MySQL database