const pg = require('pg');

// Setup PG to connect to our database
const Pool = pg.Pool;
const pool = new Pool({
  database : 'weekend-to-do-app', // the name of the DB, this can change!
  host : 'localhost', //where is your db?
  port : 5432, // Which port? 5432 is the default!
  max : 10, // How many computers connected at one time
  idleTimeoutMillis : 30000 // 30 second to try to connect, otherwise cancel
});


//very useful!
pool.on('connect', () => {
  console.log(`Postgres Connected`);
});

pool.on('error', (error) => {
  console.log(`Error with postgres pool`, error)
});

module.exports = pool;