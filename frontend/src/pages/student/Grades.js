import { useEffect, useState } from "react";
import API from "../../services/api";

function Grades(){

 const [grades,setGrades] = useState([]);

 const studentId = localStorage.getItem("userId");

 useEffect(()=>{
   fetchGrades();
 },[]);

 const fetchGrades = async ()=>{

   const res = await API.get(`/grades/${studentId}`);
   setGrades(res.data);

 };

 return(

  <div>

   <h2>Grades</h2>

   {grades.map(g=>(
     <div key={g.id}>
       Course {g.course_id} : {g.score}
     </div>
   ))}

  </div>

 );

}

export default Grades;