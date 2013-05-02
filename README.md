# MECMaps <hr>

##Code Base for DAI MEC Mapping portals

MECMaps is a portal for exploring the work of the Morocco Economic Competitiveness Project; page source is available in this repository. 

The active version (v0.7, en Francais) is [located here](http://wboykinm.github.io/mecmaps/maroc)

##Features

###Category Landing Page
![alt text](http://farm9.staticflickr.com/8262/8701660291_c7680ac64f_z.jpg "Landing")

###Easy Placename Search
![alt text](http://farm9.staticflickr.com/8556/8701665649_4d6a95a9d4_z.jpg "Search")

###Point-Specific Data
![alt text](http://farm9.staticflickr.com/8277/8702792424_fc94f7bd35_z.jpg "Points")

###Filter Map by Category, Province and Year
![alt text](http://farm9.staticflickr.com/8405/8701674775_975968b406_z.jpg "Filter")

###Download the Complete Datasets
![alt text](http://farm9.staticflickr.com/8403/8701684063_1a321b22a3_z.jpg "Download")

###URLs Include Current Map View for Sharing Focus Sites
![alt text](http://farm9.staticflickr.com/8114/8702813318_8c9bf0a0e8_z.jpg "Share")

MECMaps is built with PostGIS and Mapnik, making it ideally suited to low-bandwidth environments by offering tiled data instead of vectors. Less data to transfer, less data for a browser to interpret.

Also available here in the ```utils``` directory are tools for:
* Parsing data from project-hosted MySQL to GeoJSON
* Incorporating tiled maps from CartoDB and Mapbox servers
