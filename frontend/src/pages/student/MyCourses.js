import { useEffect, useState } from "react";
import API from "../../services/api";

function MyCourses(){

 const [courses,setCourses] = useState([]);

 const studentId = localStorage.getItem("userId");

 useEffect(()=>{
   fetchMyCourses();
 },[]);

 const fetchMyCourses = async ()=>{

   const res = await API.get(`/my-courses/${studentId}`);
   setCourses(res.data);

 };

 return(

  <div>

   <h2>My Courses</h2>

   {courses.map(c=>(
     <div key={c.id}>
      Course ID: {c.course_id}
     </div>
   ))}

  </div>

 );

}

export default MyCourses;