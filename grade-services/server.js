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

// add grade
app.post("/grades", async (req, res) => {
  const { student_id, course_id, score } = req.body;

  const result = await pool.query(
    "INSERT INTO grades(student_id,course_id,score) VALUES($1,$2,$3) RETURNING *",
    [student_id, course_id, score]
  );

  res.json(result.rows[0]);
});

// get grades
app.get("/grades/:studentId", async (req, res) => {
  const id = req.params.studentId;

  const result = await pool.query(
    "SELECT * FROM grades WHERE student_id=$1",
    [id]
  );

  res.json(result.rows);
});

app.listen(3004, () => {
  console.log("Grade service running on 3004");
});