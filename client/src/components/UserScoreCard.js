/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Card, Button, CardContent, Typography } from "@mui/material";
function UserScoreCard({ userScore, users, updateUserList, activeUser }) {
  const [numLikes, setNumLikes] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);

  useEffect(() => {
    if (userScore != undefined) {
      fetch(`/scoreboard/user/${userScore.user_id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.hasOwnProperty("likes") && data.likes != numLikes) {
            setNumLikes(data.likes);
          }
        });
    }
  }, [numLikes, userScore, updateUserList, refreshPage]);
  function handleLike() {
    fetch(`/scoreboard/user/${userScore.user_id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ liked_by: activeUser.id }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.hasOwnProperty("error")) setErrorMsg([...errorMsg, data["error"]]);
        else setErrorMsg([]);
        setRefreshPage(!refreshPage);
      });
  }
  if (userScore != undefined)
    return (
      <>
        <Card sx={{ backgroundColor: "beige", border: 0.5 }}>
          <CardContent>
            <Typography varient="h4" component="div">
              <div style={{ color: "red" }}>{errorMsg.length > 0 ? errorMsg[errorMsg.length - 1] : ""}</div>
            </Typography>
            <Typography variant="h5" component="div">
              {userScore.name}
              <Button onClick={handleLike} disabled={!activeUser || (activeUser && userScore.user_id === activeUser.id)}>
                Like this user!
              </Button>
            </Typography>
            <Typography varient="h5" component="div">
              Points: {userScore.points}
            </Typography>
            <Typography varient="h5" component="div">
              <div>
                Currently {numLikes} of {users.length - 1} other family members like {userScore.name}!
              </div>
            </Typography>
          </CardContent>
        </Card>
      </>
    );
}

export default UserScoreCard;
