const Pool = require('pg').Pool

const pool = new Pool({
    user: 'mageadmin',
    host: 'mage-postgresql.postgres.database.azure.com',
    database: 'mage-dev',
    password: 'F82DC03344Do!',
    port: 5432,
    ssl: true
});

module.exports = pool;