const { createPool } = require('mysql2');
const { promisify } = require('util');
const dotenv = require('dotenv');

dotenv.config();

const { HOSTDATABASE, NAMEDATABASE, PASSWORDDATABASE, USERDATABASE, PORTDATABASE } = require('../keys');

const pool = createPool({
    host: HOSTDATABASE,
    user: USERDATABASE,
    password: PASSWORDDATABASE,
    database: NAMEDATABASE,
    port: PORTDATABASE,
});

pool.getConnection((err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('Database connection was closed.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('Database has too many connections.');
                break;
            case 'ECONNREFUSED':
                console.error('Database connection was refused.');
                break;
            default:
                console.error('Database connection error:', err);
        }
    }

    if (connection) {
        connection.release();
        console.log('Database connected successfully.');
    }
});

pool.query = promisify(pool.query);
module.exports = pool;