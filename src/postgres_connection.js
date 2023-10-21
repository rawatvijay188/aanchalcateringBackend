const { Pool, Client } = require("pg");

require("dotenv").config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

async function executeQuery(query) {
    const client = new Client(config);
    try {
        await client.connect();
        let data = await client.query(query);
        return data.rows;
    }
    catch (err) {console.log(err); }
    finally {
        client.end()
    }

}

module.exports = { executeQuery }