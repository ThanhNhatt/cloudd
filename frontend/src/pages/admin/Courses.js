import { useEffect, useState } from "react";
import API from "../../services/api";

function Courses(){

 const [courses,setCourses] = useState([]);
 const [name,setName] = useState("");
 const [credits,setCredits] = useState("");

 useEffect(()=>{
   fetchCourses();
 },[]);

 const fetchCourses = async ()=>{
   const res = await API.get("/courses");
   setCourses(res.data);
 };

 const addCourse = async ()=>{

   await API.post("/courses",{
     name,
     credits
   });

   fetchCourses();

 };

 return(

  <div>

   <h2>Courses</h2>

   <input
    placeholder="course name"
    onChange={(e)=>setName(e.target.value)}
   />

   <input
    placeholder="credits"
    onChange={(e)=>setCredits(e.target.value)}
   />

   <button onClick={addCourse}>
    Add Course
   </button>

   <hr/>

   {courses.map(c=>(
     <div key={c.id}>
       {c.name}
     </div>
   ))}

  </div>

 );

}

export default Courses;