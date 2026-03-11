const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// GET all students
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM students");
  res.json(result.rows);
});

// ADD student
app.post("/", async (req, res) => {
  const { name, email } = req.body;

  const result = await pool.query(
    "INSERT INTO students(name,email) VALUES($1,$2) RETURNING *",
    [name, email]
  );

  res.json(result.rows[0]);
});

// DELETE
app.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await pool.query("DELETE FROM students WHERE id=$1", [id]);

  res.json({ message: "Deleted" });
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Student Service running on port", PORT);
});