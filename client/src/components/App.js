/* eslint-disable react-hooks/exhaustive-deps */
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
import NewChoreForm from "./NewChoreForm";
import AddFamilyMembers from "./AddFamilyMembers";
import UserLogin from "./UserLogin";

function App() {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [family, setFamily] = useState(null);
  function updateUserList() {
    fetch(`http://127.0.0.1:5555/users/family/${family.id}`)
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }
  useEffect(() => {
    fetch("/check_session", { credentials: "include" }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (!family || data[0].hasOwnProperty("family_id" && family.id !== data[0]["family"].id)) setFamily(data[0]["family"]);
          if (data.length > 1 && (!activeUser || activeUser.id !== data[1]["user"].id)) setActiveUser(data[1]["user"]);
        });
      }
    });
    if (family != null) {
      updateUserList();
    }
  }, [family, activeUser]);
  return (
    <div>
      <NavBar family={family} />
      <Switch>
        <Route exact path="/">
          <Home family={family} />
        </Route>
        <Route exact path="/chores">
          <ChoreList family={family} users={users} activeUser={activeUser} />
        </Route>
        <Route exact path="/users">
          <UserList users={users} />
        </Route>
        <Route exact path="/scoreboard">
          <ScoreBoard family={family} users={users} updateUserList={updateUserList} />
        </Route>
        <Route path="/login">
          <Login users={users} setFamily={setFamily} family={family} setActiveUser={setActiveUser} />
        </Route>
        <Route path="/logout">
          <Logout setFamily={setFamily} setUsers={setUsers} setActiveUser={setActiveUser} />
        </Route>
        <Route path="/signup">
          <Signup setFamily={setFamily} setActiveUser={setActiveUser} updateUserList={updateUserList} users={users} />
        </Route>
        <Route path="/chores/new">
          <NewChoreForm family={family} activeUser={activeUser} />
        </Route>
        <Route path="/users/new">
          <AddFamilyMembers family={family} users={users} updateUserList={updateUserList} setActiveUser={setActiveUser} activeUser={activeUser} />
        </Route>
        <Route path="/users/login">
          <UserLogin family={family} setActiveUser={setActiveUser} activeUser={activeUser} users={users}></UserLogin>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
