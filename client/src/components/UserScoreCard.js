/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, Card, Button, CardActions, CardContent, Typography } from "@mui/material";
function UserScoreCard({ userScore, users, updateUserList }) {
  const [userLiking, setUserLiking] = useState("");
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
  function handleChange(event) {
    setUserLiking(event.target.value);
  }
  function handleLike() {
    fetch(`/scoreboard/user/${userScore.user_id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ liked_by: userLiking }),
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
        <div style={{ color: "red" }}>{errorMsg.length > 0 ? errorMsg[errorMsg.length - 1] : ""}</div>
        <Card sx={{ minWidth: 50 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {userScore.name}
            </Typography>
            <Typography varient="h5" component="div">
              Points: {userScore.points}
            </Typography>
          </CardContent>
          <CardActions>
            <FormControl>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <InputLabel id="liked-by-id">Liked By</InputLabel>

                <Select sx={{ width: 300 }} labelId="liked-by-id" id="liked-by" value={userLiking} label="Liked by" onChange={handleChange}>
                  {users
                    .filter((user) => user.id !== userScore.user_id) //filters out own ID from liking
                    .map((user) => (
                      <MenuItem key={"liked-by-id" + user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                </Select>
                <Button onClick={handleLike}>Like this user!</Button>
              </div>
              <div>
                Currently {numLikes} of {users.length - 1} other family members like this user!
              </div>
            </FormControl>
          </CardActions>
        </Card>
      </>
    );
}

export default UserScoreCard;
