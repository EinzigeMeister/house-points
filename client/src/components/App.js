import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import UserList from "./UserList";
import NavBar from "./NavBar";
import Home from "./Home";
import ChoreList from "./ChoreList";
import ScoreBoard from "./ScoreBoard";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";

function App() {
  const [users, setUsers] = useState([]);
  const [family, setFamily] = useState(null);
  useEffect(() => {
    fetch("/check_session", { credentials: "include" }).then((response) => {
      if (response.ok) {
        response.json().then((fam) => setFamily(fam));
      }
    });
    if (family != null) {
      fetch(`http://127.0.0.1:5555/users/family/${family.id}`)
        .then((r) => r.json())
        .then((data) => setUsers(data));
    }
  }, [family]);
  return (
    <div>
      <NavBar family={family} />
      <Switch>
        <Route exact path="/">
          <Home family={family} />
        </Route>
        <Route exact path="/chores">
          <ChoreList family={family} users={users} />
        </Route>
        <Route exact path="/users">
          <UserList users={users} />
        </Route>
        <Route exact path="/scoreboard">
          <ScoreBoard family={family} />
        </Route>
        <Route path="/login">
          <Login users={users} setFamily={setFamily} setUsers={setUsers} family={family} />
        </Route>
        <Route path="/logout">
          <Logout setFamily={setFamily} setUsers={setUsers} />
        </Route>
        <Route path="/signup">
          <Signup setFamily={setFamily} />
        </Route>
      </Switch>
    </div>
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
