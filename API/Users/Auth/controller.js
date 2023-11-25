const { response } = require('express');
const pool = require('../../magedb');
const queries = require('./queries');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');


const validateUser = (req, res) => {
    const { usr_email, usr_pass } = req.params;
    pool.query(queries.checkEmailExists, [usr_email], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            res.json({ message: 'No existe el usuario.' });
        } else {
            let hash = results.rows[0].s.split(',')[3].trim();
            hash = hash.substring(0, hash.length - 1);
            bcrypt.compare(usr_pass, hash, (error, match) => {
                if (error) throw error;
                if (!match) {
                    res.json({ message: 'Contraseña incorrecta.' });
                } else {
                    let userId = results.rows[0].s.split(',')[0].trim();
                    userId = userId.substring(1);
                    console.log('User ID: ' + userId);
                    const token = jwt.sign({ userId }, 'secret', { expiresIn: '1w' });
                    console.log('Token: ' + token);
                    res.cookie('authToken', token, {
                        maxAge: 1000 * 60 * 60 * 24 * 7, // 1w
                        secure: true,
                        httpOnly: true,
                        sameSite: 'None',
                        path: '/'
                    });
                    res.json({
                        message: 'Usuario validado.',
                        userId: userId
                    });
                    return;
                }
            });
        }
    });
};



const verifyToken = (req, res, next) => {
    const authToken = req.cookies['authToken'];
    console.log("Request cookies . . ., authToken=?" + authToken);
    if (!authToken) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized, No token found' });
    }
    try {
        const decodedToken = jwt.verify(authToken, 'secret');
        let values = JSON.stringify(decodedToken);
        console.log("Decoded token: " + values);
        return res.status(200).json({ values });
    } catch (err) {
        console.log('Error trying to verify token, expired ?');
        return res.status(401).json({ message: 'Error trying to verify token, possibly expired.' });
    }
};

const verifyAdmin = (req, res, next) => {
    const { adm_email } = req.params;
    pool.query(queries.checkAdminEmailExists, [adm_email], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            res.status(404).send('No existe el usuario o no tiene permiso.');
        } else {
            res.status(200).send(`Admin verificado.`);
        }
    });
};

module.exports = {
    validateUser,
    verifyToken,
    verifyAdmin
};