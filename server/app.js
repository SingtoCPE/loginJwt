const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "singto11442525",
  database: "loginDB"
});

app.get("/data", (req, res) => {
  const sql = "SELECT * FROM loginDB.tableDB;";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/", (req, res) => res.send("Hello World!"));

// and a /readme endpoint which will be open for the world to see
app.get("/readme", (req, res) => {
  res.json({ message: "This is open to the world!" });
});

app.get("/jwt", (req, res) => {
  let privateKey = fs.readFileSync("./private.pem", "utf8");
  let token = jwt.sign({ body: "stuff" }, privateKey, { algorithm: "HS256" });
  res.send(token);
});

app.get("/secret", isAuthenticated, (req, res) => {
  res.json({ message: "THIS IS SUPER SECRET, DO NOT SHARE!" });
});

function isAuthenticated(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization;
    let privateKey = fs.readFileSync("./private.pem", "utf8");
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
      if (err) {
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
      }
      return next();
    });
  } else {
    res.status(500).json({ error: "Not Authorized" });
    throw new Error("Not Authorized");
  }
}

app.listen(port, () => {
  console.log("Project running on port:", port);
});
