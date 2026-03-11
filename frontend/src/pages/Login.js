import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){

 const [username,setUsername] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

const login = async () => {
  try {

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

  } catch(err){
    console.log(err.response?.data || err.message);
  }
};

 return(
  
<div className="login-box">

  <h2>Login</h2>

  <form>

    <div className="user-box">
      <input
        type="text"
        required
        onChange={(e)=>setUsername(e.target.value)}
      />
      <label>Username</label>
    </div>

    <div className="user-box">
      <input
        type="password"
        required
        onChange={(e)=>setPassword(e.target.value)}
      />
      <label>Password</label>
    </div>

    <button type="button" onClick={login}>
      Login
    </button>

  </form>

</div>

 );

}

export default Login;