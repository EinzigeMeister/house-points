import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
function NavBar() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <hr style={{ borderTop: "10px solid blue" }} />
        <div class="row">
          <Link to="/" className="col-sm">
            Home
          </Link>
          <Link to="/Tasks" className="col-sm">
            Tasks
          </Link>
          <Link to="/Scoreboard" className="col-sm">
            Score Board
          </Link>
        </div>
        <hr style={{ borderTop: "10px solid blue" }} />
      </div>
    </BrowserRouter>
  );
}
export default NavBar;
