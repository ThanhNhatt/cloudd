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

<>
<style>{`
  html,body{
    height:100%;
    margin:0;
    font-family:sans-serif;
    background: linear-gradient(#141e30,#243b55);
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,.6);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
  }

  .login-box h2 {
    margin: 0 0 30px;
    color: #fff;
    text-align: center;
  }

  .user-box {
    position: relative;
  }

  .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }

  .user-box label {
    position: absolute;
    top:0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
  }

  .user-box input:focus ~ label,
  .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }

  .login-btn{
    width:100%;
    padding:10px;
    border:none;
    background:#03e9f4;
    color:black;
    font-size:16px;
    border-radius:5px;
    cursor:pointer;
  }

  .login-btn:hover{
    background:#028fa1;
  }
`}</style>


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

    <button className="login-btn" type="button" onClick={login}>
      Login
    </button>

  </form>

</div>
</>

 );

}

export default Login;