import React from "react";
import { Link } from "react-router-dom";
function NavBar({ family, activeUser }) {
  return (
    <div className="container-fluid">
      <hr style={{ borderTop: "10px solid blue" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">Home</Link>
        {family == null ? null : <Link to="/chores">View Tasks</Link>}
        {family != null && activeUser && activeUser.head_of_household ? <Link to="/chores/new">Add Task</Link> : null}
        {family == null ? null : <Link to="/users/login">Change Active Member</Link>}
        {family == null ? null : <Link to="/users/new">Add Family</Link>}
        {family == null ? null : <Link to="/scoreboard">Score Board</Link>}
        {family == null ? <Link to="/login">Login</Link> : <Link to="/logout">Logout</Link>}
        <Link to="/signup">Signup</Link>
      </div>
      <hr style={{ borderTop: "10px solid blue" }} />
    </div>
  );
}
export default NavBar;
