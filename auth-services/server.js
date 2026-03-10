const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecret";


const pool = new Pool({
  connectionString: "postgresql://micsql_user:i899qR4MwWxxv9b5w5mtVwSpv5WquU2g@dpg-d6nu1cfgi27c73ac10jg-a/micsql",
  ssl: {
    rejectUnauthorized: false
  }
});


// ================= REGISTER =================
app.post("/register", async (req, res) => {

  try {

    const { username, password, role } = req.body;

    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(username,password,role) VALUES($1,$2,$3) RETURNING id,username,role",
      [username, hashed, role]
    );

    res.json(result.rows[0]);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


// ================= LOGIN =================
app.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


// ================= VERIFY TOKEN =================
function verifyToken(req, res, next) {

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {

    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;

    next();

  });

}


// ================= CURRENT USER =================
app.get("/me", verifyToken, async (req, res) => {

  const result = await pool.query(
    "SELECT id,username,role FROM users WHERE id=$1",
    [req.user.id]
  );

  res.json(result.rows[0]);

});


app.listen(3002, () => {
  console.log("Auth Service running on port 3002");
});