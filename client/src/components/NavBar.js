import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="container-fluid">
      <hr style={{ borderTop: "10px solid blue" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">Home</Link>
        <Link to="/chores">Tasks</Link>
        <Link to="/scoreboard">Score Board</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      <hr style={{ borderTop: "10px solid blue" }} />
    </div>
  );
}
export default NavBar;
