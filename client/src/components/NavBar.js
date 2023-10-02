import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="container-fluid">
      <hr style={{ borderTop: "10px solid blue" }} />
      <div className="row">
        <Link to="/" className="col-sm">
          Home
        </Link>
        <Link to="/chores" className="col-sm">
          Tasks
        </Link>
        <Link to="/scoreboard" className="col-sm">
          Score Board
        </Link>
      </div>
      <hr style={{ borderTop: "10px solid blue" }} />
    </div>
  );
}
export default NavBar;
