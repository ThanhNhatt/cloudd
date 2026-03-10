import { useEffect, useState } from "react";
import API from "../../services/api";

function Courses(){

 const [courses,setCourses] = useState([]);

 const studentId = localStorage.getItem("userId");

 useEffect(()=>{
  fetchCourses();
 },[]);

 const fetchCourses = async ()=>{
   const res = await API.get("/courses");
   setCourses(res.data);
 };

 const registerCourse = async (courseId)=>{

   await API.post("/enroll",{
     student_id:studentId,
     course_id:courseId
   });

   alert("Course registered");

 };

 return(

  <div>

   <h2>Courses</h2>

   {courses.map(course =>(

     <div key={course.id}>

       {course.name} ({course.credits})

       <button
        onClick={()=>registerCourse(course.id)}
       >
        Register
       </button>

     </div>

   ))}

  </div>

 );

}

export default Courses;