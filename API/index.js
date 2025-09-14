const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./Users/CRUD/routes');
const authRoutes = require('./Users/Auth/routes');
const geolocationRoutes = require('./Geolocation/Map/routes');
const customersInputsRoutes = require('./Geolocation/Inputs/routes');
require('dotenv').config();
const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN || 'http://127.0.0.1:5501';
const smtp = 'https://smtpjs.com/v3/smtpjs.aspx?';


const app = express();
app.use(cors({
    origin: [origin, smtp],
    credentials: true
}));

app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.static('public'));

app.use('/locationwise/v1/users', usersRoutes);
app.use('/locationwise/v1/auth', authRoutes);
app.use('/locationwise/v1/geocode-settlement', geolocationRoutes);
app.use('/locationwise/v1/customers-inputs', customersInputsRoutes);

app.listen(port, () =>
    console.log(`App listening on port: ${port} . .  .`));