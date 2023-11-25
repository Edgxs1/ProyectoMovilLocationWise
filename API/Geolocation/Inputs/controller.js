const { response } = require('express');
const { Pool } = require('pg');
const pool = require('../../magedb');


const getSettlementByInputs = async (req, res) => {
    const nivelsocioeconomico = req.params.nivelsocioeconomico;
    const edades = req.params.edades;
    const escolaridad = req.params.escolaridad;
    const situacioneconomica = req.params.situacioneconomica;
    const situacionescolar = req.params.situacionescolar;
    const situacionconyugal = req.params.situacionconyugal;
    const religion = req.params.religion;
    const limitacion = req.params.limitacion;
    let query = 'SELECT cvegeo FROM "Consults_schema"."AGEB DATA CDMX" WHERE ';
    query += 'lw_economiapred = $1 ORDER BY (';
    const queryParams = [nivelsocioeconomico];

    query += ` ${edades}`;

    if (escolaridad != null && escolaridad != 'null') {
        // LOGIC FOR ARRAYS: columnSum.push('t.Xcolumn + t.Ycolumn + t.Ncolumn + ...');
        query += ` + ${escolaridad} `;
    }
    if (situacioneconomica != null && situacioneconomica != 'null') {
        query += ` + ${situacioneconomica} `;
    }
    if (situacionescolar != null && situacionescolar != 'null') {
        query += ` + ${situacionescolar} `;
    }
    if (situacionconyugal != null && situacionconyugal != 'null') {
        query += ` + ${situacionconyugal} `;
    }
    if (religion != null && religion != 'null') {
        query += ` + ${religion} `;
    }
    if (limitacion != null && limitacion != 'null') {
        query += ` + ${limitacion} `;
    }

    query += ') DESC;';
    console.log("input query: " + query);
    pool.query(query, queryParams, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

getSettlementByInputsDensity = async (req, res) => {
    const nivelsocioeconomico = req.params.nivelsocioeconomico;
    const edades = req.params.edades;
    const escolaridad = req.params.escolaridad;
    const situacioneconomica = req.params.situacioneconomica;
    const situacionescolar = req.params.situacionescolar;
    const situacionconyugal = req.params.situacionconyugal;
    const religion = req.params.religion;
    const limitacion = req.params.limitacion;
    let query = 'SELECT cvegeo, (';
    const queryParams = [nivelsocioeconomico];

    query += ` (${edades} / area_sqm)`;

    if (escolaridad != null && escolaridad != 'null') {
        query += ` + (${escolaridad} / area_sqm)`;
    }
    if (situacioneconomica != null && situacioneconomica != 'null') {
        query += ` + (${situacioneconomica} / area_sqm)`;
    }
    if (situacionescolar != null && situacionescolar != 'null') {
        query += ` + (${situacionescolar} / area_sqm)`;
    }
    if (situacionconyugal != null && situacionconyugal != 'null') {
        query += ` + (${situacionconyugal} / area_sqm)`;
    }
    if (religion != null && religion != 'null') {
        query += ` + (${religion} / area_sqm)`;
    }
    if (limitacion != null && limitacion != 'null') {
        query += ` + (${limitacion} / area_sqm)`;
    }

    query += `) AS total_custom_density FROM "Consults_schema"."AGEB DATA CDMX" `;
    query += ` WHERE lw_economiapred = $1 AND ${edades} > 0`;
    if (escolaridad != null && escolaridad != 'null') {
        query += ` AND ${escolaridad} > 0 `;
    }
    if (situacioneconomica != null && situacioneconomica != 'null') {
        query += ` AND ${situacioneconomica} > 0 `;
    }
    if (situacionescolar != null && situacionescolar != 'null') {
        query += ` AND ${situacionescolar} > 0 `;
    }
    if (situacionconyugal != null && situacionconyugal != 'null') {
        query += ` AND ${situacionconyugal} > 0 `;
    }
    if (religion != null && religion != 'null') {
        query += ` AND ${religion} > 0 `;
    }
    if (limitacion != null && limitacion != 'null') {
        query += ` AND ${limitacion} > 0 `;
    }

    query += ` ORDER BY total_custom_density DESC;`;

    console.log('desity query: ' + query);
    pool.query(query, queryParams, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getSettlementByInputs,
    getSettlementByInputsDensity
};