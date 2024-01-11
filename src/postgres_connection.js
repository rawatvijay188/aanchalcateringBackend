const { Pool, Client } = require("pg");
const fs = require("fs");
const path = require('path');


require("dotenv").config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
        ca: fs
          .readFileSync(path.join(__dirname, 'certs', 'ap-south-1-bundle.pem'))
          .toString(),
      },
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