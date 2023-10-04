import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import UserList from "./UserList";
import NavBar from "./NavBar";
import Home from "./Home";
import ChoreList from "./ChoreList";
import ScoreBoard from "./ScoreBoard";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  const [users, setUsers] = useState([]);
  const [family, setFamily] = useState(null);

  useEffect(() => {}, []);
  return (
    <div>
      <NavBar />
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
