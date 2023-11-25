//Path to DB: 'SELECT t.* FROM "Consults_schema"."AGEBS CDMX" t'
//const GetAllSettlements = 'SELECT ST_AsGeoJSON(geom,4326) FROM "Consults_schema"."AGEBS CDMX" t';
//Get all the geometry data from the database, column name is 'geom', also gets the cvegeo column
const GetAllSettlements = 'SELECT t.*, ST_AsGeoJSON(geom,4326), cvegeo FROM "Consults_schema"."AGEBS CDMX" t';
//Get the geojson data from the database and return the specified one (GetAgebByCvegeo)
const GetAgebByCvegeo = 'SELECT t.*, CTID FROM "Consults_schema"."AGEB DATA CDMX" t WHERE t.cvegeo = $1';
//Get the ageb data from the database and return the specified one according to the similarity percentage, accepts float values
const GetSimilarSettlements = 'SELECT t.*, CTID FROM "Consults_schema"."AGEB DATA CDMX" t WHERE t.lw_economiapred = $1 AND t.pobtot BETWEEN $2::float AND $3::float AND t.graproes BETWEEN $4::float AND $5::float AND t.lw_edprom BETWEEN $6::float AND $7::float';

module.exports = {
    GetAllSettlements,
    GetAgebByCvegeo,
    GetSimilarSettlements,
};