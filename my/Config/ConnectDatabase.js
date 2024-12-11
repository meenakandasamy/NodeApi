const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433,
  password: "Meenakandasamy@5422",
  database: "Demo", 
});

// Connect to the database
client.connect((err) => {
  if (err) {
    console.error("Connection error:", err.stack);
  } else {
    console.log("Connected to the database");


    client.query(`SELECT * FROM public."Testing"`, (err, res) => {
      if (err) {
        console.error("Query error:", err.message);
      } else {
        console.log("Query result:", res.rows); // Log the result rows
      }

      // Close the connection
      client.end((err) => {
        if (err) {
          console.error("Error closing connection:", err.stack);
        } else {
          console.log("Connection closed");
        }
      });
    });
  }
});