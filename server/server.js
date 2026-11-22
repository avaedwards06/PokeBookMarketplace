require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const PORT = 3000;

// connection to the MySQL database (login info is in .env !!!)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Job 1: send the website (main.html, css, js, images...)
app.use(express.static(path.join(__dirname, "..", "client")));

// the API
// The ? in a query is filled in by the second argument of
// db.query()

// List all markets
app.get("/api/markets", async (req, res) => {
  try {
    const [markets] = await db.query(
      "SELECT ID, Name FROM Market ORDER BY ID"
    );
    res.json(markets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// one market: its name, its vendors, and its in-stock products
app.get("/api/markets/:id", async (req, res) => {
  const marketId = req.params.id;

  try {
    const [marketRows] = await db.query(
      "SELECT ID, Name FROM Market WHERE ID = ?",
      [marketId]
    );

    if (marketRows.length === 0) {
      return res.status(404).json({ error: "Market not found" });
    }

    const [vendors] = await db.query(
      "SELECT ID, Name FROM Vendor WHERE MarketID = ? ORDER BY Name",
      [marketId]
    );

    const [products] = await db.query(
      `SELECT Item.ID, Item.Name, Item.Price, Item.Description,
              Vendor.ID AS VendorID, Vendor.Name AS Vendor,
              VendorSells.Stock
       FROM Vendor
       JOIN VendorSells ON VendorSells.VendorID = Vendor.ID
       JOIN Item ON Item.ID = VendorSells.ItemID
       WHERE Vendor.MarketID = ?
         AND VendorSells.Stock > 0
       ORDER BY Item.Name`,
      [marketId]
    );

    res.json({
      id: marketRows[0].ID,
      name: marketRows[0].Name,
      vendors: vendors,
      products: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// one vendor: its name, its market, and everything it sells
app.get("/api/vendors/:id", async (req, res) => {
  const vendorId = req.params.id;

  try {
    const [vendorRows] = await db.query(
      `SELECT Vendor.ID, Vendor.Name, Market.ID AS MarketID,
              Market.Name AS Market
       FROM Vendor
       JOIN Market ON Market.ID = Vendor.MarketID
       WHERE Vendor.ID = ?`,
      [vendorId]
    );

    if (vendorRows.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // inventory
    const [products] = await db.query(
      `SELECT Item.ID, Item.Name, Item.Price, Item.Description,
              VendorSells.Stock
       FROM VendorSells
       JOIN Item ON Item.ID = VendorSells.ItemID
       WHERE VendorSells.VendorID = ?
       ORDER BY Item.Name`,
      [vendorId]
    );

    res.json({
      id: vendorRows[0].ID,
      name: vendorRows[0].Name,
      marketId: vendorRows[0].MarketID,
      market: vendorRows[0].Market,
      products: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// search products by name
app.get("/api/search", async (req, res) => {
  const search = req.query.q || "";

  try {
    const [products] = await db.query(
      `SELECT Item.ID, Item.Name, Item.Price,
              Vendor.ID AS VendorID, Vendor.Name AS Vendor,
              Market.Name AS Market
       FROM Item
       JOIN VendorSells ON VendorSells.ItemID = Item.ID
       JOIN Vendor ON Vendor.ID = VendorSells.VendorID
       JOIN Market ON Market.ID = Vendor.MarketID
       WHERE Item.Name LIKE ?
         AND VendorSells.Stock > 0
       ORDER BY Item.Price`,
      ["%" + search + "%"]
    );
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// start the server
app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT + "/main.html");
});