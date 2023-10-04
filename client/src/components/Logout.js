import React from "react";

function Logout({ setFamily, setUsers }) {
  function handleLogout() {
    fetch("/logout", {
      credentials: "include",
      method: "DELETE",
    }).then(() => {
      setFamily(null);
      setUsers([]);
    });
  }

  return (
    <header>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Logout;
