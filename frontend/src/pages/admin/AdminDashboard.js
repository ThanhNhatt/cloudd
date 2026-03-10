import { Link } from "react-router-dom";

function AdminDashboard(){

 return(

  <div>

   <h2>Admin Dashboard</h2>

   <ul>

  <li><Link to="/admin/students">Students</Link></li>
<li><Link to="/admin/courses">Courses</Link></li>
<li><Link to="/admin/grades">Grades</Link></li>

   </ul>

  </div>

 );

}

export default AdminDashboard;