require("dotenv").config();
const mysql = require("mysql");
const util = require('util');

const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: process.env.DB_PASSWORD,
    database: "employeeDB"
  });

  connection.connect( () => {
      console.log("connected as " + connection.threadId);
  });

  connection.query = util.promisify(connection.query);

  module.exports = connection;