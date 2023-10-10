/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import UserScoreCard from "./UserScoreCard";
import { Button } from "@mui/material";
function ScoreBoard({ family, users, updateUserList, activeUser }) {
  const [userScores, setUserScores] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  useEffect(() => {
    if (family && users.length > 0) {
      fetch(`/scoreboard/family/${family.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data != undefined && !data.hasOwnProperty("error")) {
            const scoreList = data.score_list.toSorted((a, b) => b.points - a.points);

            let newScores = [];
            for (const s of scoreList) {
              for (const u of users) {
                if (s.user_id === u.id) {
                  newScores.push({ ...s, name: u.name });
                }
              }
            }
            setUserScores(newScores);
          }
        });
    }
  }, [family, users, updateUserList, refreshPage]);
  function handleReset() {
    //fetch to delete tasks, delete user-likes. keep family and users
    fetch(`/tasks/family/${family.id}`, {
      credentials: "include",
      method: "DELETE",
    })
      .then(
        fetch(`/likes/family/${family.id}`, {
          credentials: "include",
          method: "DELETE",
        })
      )
      .then(setRefreshPage(!refreshPage));
  }
  if (!family) return <h1>Login to view your family's score board.</h1>;
  else {
    if (users.length < 1) return <div>Add users to get their scores!</div>;
    else {
      if (userScores.length > 0)
        return (
          <>
            <div hidden={activeUser} style={{ color: "red" }}>
              You must log in from the Change Active Member page to interact with the scoreboard
            </div>
            <Button onClick={handleReset} disabled={!activeUser || !(activeUser && activeUser.head_of_household)}>
              Reset scores! {"(This will also remove all tasks and likes)"}
            </Button>
            <div style={{ color: "blue" }}>{activeUser && !activeUser.head_of_household ? "You must be head of household to reset the scores" : ""}</div>
            {userScores.map((x) => {
              return (
                <UserScoreCard key={"ScoreCard id" + x.name + x.user_id} updateUserList={updateUserList} userScore={x} users={users} activeUser={activeUser} />
              );
            })}
          </>
        );
      else return <div>Loading ScoreBoard</div>;
    }
  }
}

export default ScoreBoard;
