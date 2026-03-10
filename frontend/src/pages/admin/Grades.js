import { useState } from "react";
import API from "../../services/api";

function Grades(){

 const [studentId,setStudentId] = useState("");
 const [courseId,setCourseId] = useState("");
 const [score,setScore] = useState("");

 const addGrade = async ()=>{

   await API.post("/grades",{
     student_id:studentId,
     course_id:courseId,
     score
   });

   alert("Grade added");

 };

 return(

  <div>

   <h2>Add Grade</h2>

   <input
    placeholder="student id"
    onChange={(e)=>setStudentId(e.target.value)}
   />

   <input
    placeholder="course id"
    onChange={(e)=>setCourseId(e.target.value)}
   />

   <input
    placeholder="score"
    onChange={(e)=>setScore(e.target.value)}
   />

   <button onClick={addGrade}>
     Add
   </button>

  </div>

 );

}

export default Grades;