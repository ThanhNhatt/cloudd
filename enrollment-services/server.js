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


// ================= TEST SERVICE =================
app.get("/", (req, res) => {
  res.send("Enrollment Service Running");
});


// ================= ENROLL COURSE =================
app.post("/enroll", async (req, res) => {

  const { student_id, course_id } = req.body;

  const result = await pool.query(
    "INSERT INTO enrollments(student_id,course_id) VALUES($1,$2) RETURNING *",
    [student_id, course_id]
  );

  res.json(result.rows[0]);
});


// ================= GET MY COURSES =================
app.get("/my-courses/:student_id", async (req, res) => {

  const { student_id } = req.params;

  const result = await pool.query(
    "SELECT * FROM enrollments WHERE student_id=$1",
    [student_id]
  );

  res.json(result.rows);
});


// ================= DROP COURSE =================
app.delete("/drop/:id", async (req, res) => {

  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM enrollments WHERE id=$1 RETURNING *",
    [id]
  );

  res.json({
    message: "Course dropped",
    enrollment: result.rows[0]
  });
});


const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log("Enrollment Service running on port", PORT);
});