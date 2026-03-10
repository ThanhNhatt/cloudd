const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const pool = new Pool({
  connectionString: "postgresql://micsql_user:i899qR4MwWxxv9b5w5mtVwSpv5WquU2g@dpg-d6nu1cfgi27c73ac10jg-a/micsql",
  ssl: {
    rejectUnauthorized: false
  }
});


// ================= TEST SERVICE =================
app.get("/", (req, res) => {
  res.send("Course Service Running");
});


// ================= GET ALL COURSES =================
app.get("/courses", async (req, res) => {
  const result = await pool.query("SELECT * FROM courses");
  res.json(result.rows);
});


// ================= GET COURSE BY ID (THÊM) =================
app.get("/courses/:id", async (req, res) => {

  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM courses WHERE id=$1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(result.rows[0]);
});


// ================= CREATE COURSE =================
app.post("/courses", async (req, res) => {

  const { name, credits } = req.body;

  const result = await pool.query(
    "INSERT INTO courses(name,credits) VALUES($1,$2) RETURNING *",
    [name, credits]
  );

  res.json(result.rows[0]);
});


// ================= UPDATE COURSE (THÊM) =================
app.put("/courses/:id", async (req, res) => {

  const { id } = req.params;
  const { name, credits } = req.body;

  const result = await pool.query(
    "UPDATE courses SET name=$1, credits=$2 WHERE id=$3 RETURNING *",
    [name, credits, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(result.rows[0]);
});


// ================= DELETE COURSE (THÊM) =================
app.delete("/courses/:id", async (req, res) => {

  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM courses WHERE id=$1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json({ message: "Course deleted", course: result.rows[0] });
});


app.listen(3003, () => {
  console.log("Course service running on 3003");
});