## Killin' nulls
    UPDATE oriental_2012 SET autres=0 WHERE autres IS NULL;


## Getting everything to the right data type - should work yet does not :(
    ALTER TABLE oriental_2012 ALTER COLUMN hectares_3 TYPE float;


## Converting the cultivar data structure to a useable one
	UPDATE oriental_2012 SET canal = hectares_1 WHERE culture_1 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_2 WHERE culture_2 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_3 WHERE culture_3 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_4 WHERE culture_4 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_5 WHERE culture_5 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_6 WHERE culture_6 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_7 WHERE culture_7 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_8 WHERE culture_8 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_9 WHERE culture_9 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_10 WHERE culture_10 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_11 WHERE culture_11 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_12 WHERE culture_12 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_13 WHERE culture_13 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_14 WHERE culture_14 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_15 WHERE culture_15 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_16 WHERE culture_16 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_17 WHERE culture_17 ILIKE '%canal%';
	UPDATE oriental_2012 SET canal = canal + hectares_18 WHERE culture_18 ILIKE '%canal%';

##  Merging with matching schema
    SELECT the_geom, the_geom_webmercator, cartodb_id, autres, bett, ble, canal, clem, eau, foret, fourr, fruitd, fruits, habi, incul, jache, legum, luze, mais, marai, name, navel, oliv, orge, oued, parc, pdt, route, year FROM ag_survey_2011
    UNION ALL
    SELECT the_geom, the_geom_webmercator, cartodb_id, autres, bett, ble, canal, clem, eau, foret, fourr, fruitd, fruits, habi, incul, jache, legum, luze, mais, marai, name, navel, oliv, orge, oued, parc, pdt, route, year FROM oriental_2012

## Creating an "Everything" column
    UPDATE ag_survey_11_12 SET tout=autres+bett+ble+canal+clem+eau+foret+fourr+fruitd+fruits+habi+incul+jache+legum+luze+mais+marai+navel+oliv+orge+oued+parc+pdt+route;