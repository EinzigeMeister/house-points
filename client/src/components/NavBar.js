import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
function NavBar() {
  return (
    <BrowserRouter>
      <div class="container-fluid">
        <hr style={{ borderTop: "10px solid blue" }} />
        <div class="row">
          <Link to="/" class="col-sm">
            Home
          </Link>
          <Link to="/Tasks" class="col-sm">
            Tasks
          </Link>
          <Link to="/Scoreboard" class="col-sm">
            Score Board
          </Link>
        </div>
        <hr style={{ borderTop: "10px solid blue" }} />
      </div>
    </BrowserRouter>
  );
}
export default NavBar;
