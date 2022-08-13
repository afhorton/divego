require("dotenv").config({path: `../wetmap/.env.local`});

// heroku pg:psql 
//to connect to the heroku postgres DB form the terminal

const dbDevParams = { 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const dbProdParams = { 
    connectionString: process.env.DATABASE_URL
};


const { Pool } = require("pg");
const db = new Pool(process.env.NODE_ENV === "production" ? dbProdParams : dbDevParams);

db.connect(() => {
    console.log(`db is connected via port: ${dbDevParams['port']}`);
});

module.exports = db;