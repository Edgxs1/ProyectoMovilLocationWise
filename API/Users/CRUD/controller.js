const pool = require('../../magedb');
const queries = require('./queries');
const bcrypt = require('bcrypt');

const getAllUsers = (req, res) => {
    pool.query(queries.getAllUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserByID = (req, res) => {
    const usr_id = parseInt(req.params.usr_id);
    pool.query(queries.getUserByID, [usr_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const AddUser = (req, res) => {
    let { usr_username, usr_email, usr_pass } = req.body;
    console.log(usr_username, usr_email, usr_pass);
    pool.query(queries.checkEmailExists, [usr_email], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send('Ese email ya existe.');
        } else {
            bcrypt.genSalt(10, (error, salt) => {
                if (error) throw error;
                bcrypt.hash(usr_pass, salt, (error, hash) => {
                    if (error) throw error;
                    usr_pass = hash;
                    pool.query(queries.addUser, [usr_username, usr_email, usr_pass], (error, results) => {
                        if (error) throw error;
                        res.status(201).send('Nuevo usuario agregado exitosamente.');
                    });
                });
            });
        }
    });
};

const deleteUserByID = (req, res) => {
    const usr_id = parseInt(req.params.usr_id);
    pool.query(queries.getUserByID, [usr_id], (error, results) => {
        if (error) throw error;
        //Checks the users existence
        if (!results.rows.length) {
            res.status(404).send('No existe el usuario.');
        }
        else {
            pool.query(queries.deleteUserByID, [usr_id], (error, results) => {
                if (error) throw error;
                res.clearCookie('authToken');
                res.status(200).send(`Usuario con ID ${usr_id} eliminado exitosamente.`);
            });
        }
    });
};

const deleteUserByEmail = (req, res) => {
    const usr_email = req.params.usr_email;
    pool.query(queries.checkEmailExists, [usr_email], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            res.status(404).send('No existe el usuario.');
        }
        else {
            pool.query(queries.deleteUserByEmail, [usr_email], (error, results) => {
                if (error) throw error;
                res.clearCookie('authToken');
                res.status(200).send(`Usuario con email ${usr_email} eliminado exitosamente.`);
            });
        }
    });
};

const updateUserByID = (req, res) => {
    const usr_id = parseInt(req.params.usr_id);
    let { usr_username, usr_email, usr_pass } = req.body;
    pool.query(queries.getUserByID, [usr_id], (error, results) => {
        if (error) throw error;
        //Checks the users existence
        if (!results.rows.length) {
            res.send('No existe el usuario.');
        }
        else {
            bcrypt.genSalt(10, (error, salt) => {
                if (error) throw error;
                bcrypt.hash(usr_pass, salt, (error, hash) => {
                    if (error) throw error;
                    usr_pass = hash;
                    pool.query(queries.updateUserByID, [usr_username, usr_email, usr_pass, usr_id], (error, results) => {
                        if (error) throw error;
                        res.status(200).send(`Datos del usuario con ID ${usr_id} actualizados exitosamente.`);
                    });
                });
            });
        }
    });
};

const addAdmin = (req, res) => {
    const usr_email = req.params.usr_email;
    pool.query(queries.checkEmailExists, [usr_email], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            res.status(404).send('No existe el usuario.');
        }
        else {
            pool.query(queries.addAdmin, [usr_email], (error, results) => {
                if (error) throw error;
                res.status(200).send(`Usuario con email ${usr_email} ahora es administrador.`);
            });
        }
    });
};

module.exports = {
    getAllUsers,
    getUserByID,
    AddUser,
    deleteUserByID,
    deleteUserByEmail,
    updateUserByID,
    addAdmin
};