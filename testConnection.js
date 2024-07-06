// testConnection.js

const { query } = require('./db');

async function testConnection() {
  try {
    const res = await query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message); // Should print 'Hello world!'
  } catch (err) {
    console.error('Error connecting to database', err);
  }
}

testConnection();
