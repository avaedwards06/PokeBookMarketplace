// this is genuinely hell

require("dotenv").config();
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function runFile(connection, fileName) {
  const filePath = path.join(__dirname, "..", "sql", fileName);
  const sql = fs.readFileSync(filePath, "utf8");
  await connection.query(sql);
  console.log("Ran " + fileName);
}

async function resetDatabase() {
  // the script creates the database itself
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
  });

  try {
    // start with a fresh, empty database
    const dbName = process.env.DB_NAME;
    await connection.query("DROP DATABASE IF EXISTS `" + dbName + "`");
    await connection.query("CREATE DATABASE `" + dbName + "`");
    await connection.query("USE `" + dbName + "`");
    console.log("Created a fresh " + dbName + " database");

    await runFile(connection, "schema.sql");
    await runFile(connection, "data.sql");
    console.log("Database is ready!");
  } catch (err) {
    console.error("Something went wrong:", err.message);
  } finally {
    await connection.end();
  }
}

resetDatabase();