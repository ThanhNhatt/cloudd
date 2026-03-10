import { Link } from "react-router-dom";

function StudentDashboard(){

 return(

  <div>

   <h2>Student Dashboard</h2>

   <ul>

    <li><Link to="/student/courses">Courses</Link></li>
    <li><Link to="/student/mycourses">My Courses</Link></li>
    <li><Link to="/student/grades">Grades</Link></li>

   </ul>

  </div>

 );

}

export default StudentDashboard;