const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors({
  origin: "https://frontend-toee.onrender.com"
}));

app.use(express.json());

const SECRET = "mysecret";

const pool = new Pool({
  connectionString: "postgresql://micsql_user:i899qR4MwWxxv9b5w5mtVwSpv5WquU2g@dpg-d6nu1cfgi27c73ac10jg-a/micsql",
  ssl: { rejectUnauthorized: false }
});

app.post("/register", async (req, res) => {
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
});

app.post("/login", async (req, res) => {

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
    { id: user.id, role: user.role },
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
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log("Auth Service running on port", PORT);
});