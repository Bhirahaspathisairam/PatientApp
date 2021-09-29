var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Task2",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected successfully");
});

module.exports = connection;
