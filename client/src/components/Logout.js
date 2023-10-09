import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Logout({ setFamily, setUsers, setActiveUser }) {
  let history = useHistory();
  function handleLogout() {
    fetch("/logout", {
      credentials: "include",
      method: "DELETE",
    }).then(() => {
      setFamily(null);
      setUsers([]);
      setActiveUser(null)
      history.push("/login");
    });
  }

  return (
    <header>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Logout;
