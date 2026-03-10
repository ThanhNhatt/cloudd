import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){

 const navigate = useNavigate();

 useEffect(()=>{

   const role = localStorage.getItem("role");

   if(role === "admin"){
     navigate("/admin");
   }else{
     navigate("/student");
   }

 },[]);

 return <h2>Loading...</h2>;

}

export default Dashboard;