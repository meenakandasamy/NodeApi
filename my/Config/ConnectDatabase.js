const { Client } = require("pg");

const dataClient = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433,
  password: "Meenakandasamy@5422",
  database: "Demo", // Make sure this is the correct database
});

module.exports = dataClient;