const pg = require('pg');

const config = {
        database: 'weekend-to-do-app',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

// ********LIVE SOLVE**********
// const pool = pg.Pool({
//   database: 'weekend-to-do-app',
//   host: 'localhost',
//   port: 5432,
//   max: 27,
//   idleTimeoutMillis: 10000
// }) // end Pool

pool.on('connect', () => {
        console.log('connected to postgres');
});

pool.on('error', err => {
        console.log('error connecting to postgres', err);
});

module.exports = pool;
