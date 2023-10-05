import React from "react";
import { Link } from "react-router-dom";
function NavBar({ family }) {
  return (
    <div className="container-fluid">
      <hr style={{ borderTop: "10px solid blue" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">Home</Link>
        <Link to="/chores">View Tasks</Link>
        <Link to="/chores/new">Add Task</Link>
        <Link to="/users/new">Add Family</Link>
        <Link to="/scoreboard">Score Board</Link>
        {family == null ? <Link to="/login">Login</Link> : <Link to="/logout">Logout</Link>}
        <Link to="/signup">Signup</Link>
      </div>
      <hr style={{ borderTop: "10px solid blue" }} />
    </div>
  );
}
export default NavBar;
