import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [users, setUsers] = useState([]);
  const [family, setFamily] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users").then((r) => r.json().then((userList) => setUsers(userList)));
  }, []);
  if (users.length < 1) {
    return <h1>Project Client</h1>;
  } else return <h1>Found users!</h1>;
}

export default App;
