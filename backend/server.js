const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
const db = mysql.createConnection({
  host: "127.0.0.1",   // NOT localhost
  user: "Atharva",
  password: "Atharva@2005",
  database: "codecoffee",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("Database Connected");
  }
});

// ADD ORDER API
app.post("/addOrder", (req, res) => {

  const { item_name, quantity, price } = req.body;

  console.log("Incoming Order:", req.body);

  db.query(
    "INSERT INTO orders(item_name, quantity, price) VALUES (?, ?, ?)",
    [item_name, quantity, price],
    (err, result) => {

      if (err) {
        console.log("SQL ERROR:", err);
        res.status(500).send(err);
      } else {
        console.log("Inserted Successfully");
        res.send("Order Added");
      }

    }
  );

});

// AI RECOMMENDATION API
app.get("/recommend", (req,res)=>{
  exec("python recommendation.py", (err,stdout,stderr)=>{

    if(err){
      console.log("ERROR:", err);
      console.log("STDERR:", stderr);
      res.send("Error running AI");
    }
    else{
      console.log("OUTPUT:", stdout);
      res.send(stdout);
    }

  });
});

// START SERVER
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});
const { exec } = require("child_process");

app.get("/recommend", (req,res)=>{
  exec("python recommendation.py", (err,stdout)=>{
    if(err){
      res.send("Error in recommendation");
    }
    else{
      res.send(stdout);
    }
  });
});
// SALES ANALYTICS API
app.get("/sales-data", (req, res) => {
  const query = `
    SELECT item_name, SUM(quantity) AS total
    FROM (
      SELECT item_name, quantity FROM orders
      UNION ALL
      SELECT item_name, quantity FROM order_items
    ) AS combined
    GROUP BY item_name
    ORDER BY total DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});
app.post("/create-order", (req, res) => {

  const { items, total, payment_status, status } = req.body;

  const insertOrderQuery = `
    INSERT INTO customer_orders (total, payment_status, status)
    VALUES (?, ?, ?)
  `;

  db.query(insertOrderQuery, [total, payment_status, status], (err, result) => {
    if (err) return res.status(500).send(err);

    const orderId = result.insertId;

    items.forEach(item => {
      db.query(
        "INSERT INTO order_items (order_id, item_name, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.name, item.quantity, item.price]
      );
    });

    res.send("Order Created");
  });
});
