import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./UserList";
import NavBar from "./NavBar";
import Home from "./Home";
function App() {
  const [taskList, setTaskList] = useState([]);
  const [users, setUsers] = useState([]);
  const [family, setFamily] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users").then((r) => r.json().then((userList) => setUsers(userList)));
  }, []);
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home family={family} />
        </Route>
        <Route exact path="/users">
          <UserList users={users}></UserList>
        </Route>
      </Switch>
    </Router>
  );
  // if (users.length < 1) {
  //   return <h1>Project Client</h1>;
  // } else
  //   return (
  //     <div className="container">
  //       {users.map((user) => {
  //         return <UserCard user={user} key={user.id}></UserCard>;
  //       })}
  //     </div>
  //   );
}

export default App;
