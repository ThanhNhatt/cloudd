import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){

 const [username,setUsername] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

 const login = async ()=>{

   const res = await API.post("/auth/login",{
     username,
     password
   });

   localStorage.setItem("token",res.data.token);
   localStorage.setItem("role",res.data.user.role);
   localStorage.setItem("userId",res.data.user.id);

   if(res.data.user.role === "admin"){
     navigate("/admin");
   }else{
     navigate("/student");
   }

 };

 return(

  <div>

   <h2>Login</h2>

   <input
    placeholder="username"
    onChange={(e)=>setUsername(e.target.value)}
   />

   <input
    placeholder="password"
    type="password"
    onChange={(e)=>setPassword(e.target.value)}
   />

   <button onClick={login}>
    Login
   </button>

  </div>

 );

}

export default Login;