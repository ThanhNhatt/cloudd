import { useEffect, useState } from "react";
import API from "../../services/api";

function Students(){

 const [students,setStudents] = useState([]);

 useEffect(()=>{
   fetchStudents();
 },[]);

 const fetchStudents = async ()=>{
   const res = await API.get("/students");
   setStudents(res.data);
 };

 return(

  <div>

   <h2>Students</h2>

   {students.map(s=>(
     <div key={s.id}>
       {s.name}
     </div>
   ))}

  </div>

 );

}

export default Students;