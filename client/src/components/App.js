import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import UserCard from "./UserCard";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [users, setUsers] = useState([]);
  const [family, setFamily] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users").then((r) => r.json().then((userList) => setUsers(userList)));
  }, []);
  if (users.length < 1) {
    return <h1>Project Client</h1>;
  } else
    return (
      <div className="container">
        {users.map((user) => {
          return <UserCard user={user} key={user.id}></UserCard>;
        })}
      </div>
    );
}

export default App;
