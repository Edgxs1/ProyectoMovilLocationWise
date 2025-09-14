const pool = require('../../magedb');
const queries = require('./queries');

const GetAllSettlements = async (req, res) => {
    pool.query(queries.GetAllSettlements, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const GetAgebByCvegeo = async (req, res) => {
    const cvegeo = req.params.cvegeo;
    pool.query(queries.GetAgebByCvegeo, [cvegeo], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const GetSimilarSettlements = async (req, res) => {
    const lw_economiapred = req.params.lw_economiapred;
    const pobtotSTART = req.params.pobtotSTART;
    const pobtotEND = req.params.pobtotEND;
    const graproesSTART = req.params.graproesSTART;
    const graproesEND = req.params.graproesEND;
    const lw_edpromSTART = req.params.lw_edpromSTART;
    const lw_edpromEND = req.params.lw_edpromEND;
    pool.query(queries.GetSimilarSettlements, [lw_economiapred, pobtotSTART, pobtotEND, graproesSTART, graproesEND, lw_edpromSTART, lw_edpromEND], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};




module.exports = {
    GetAgebByCvegeo,
    GetAllSettlements,
    GetSimilarSettlements,
};
