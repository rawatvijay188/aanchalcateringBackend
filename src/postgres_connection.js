const { Pool, Client } = require("pg");

require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

async function executeQuery(query) {
    const client = await pool.connect();
    try {
        let data = await client.query(query);
        return data.rows;
    } finally {
        client.release()
    }

}

module.exports = { executeQuery }