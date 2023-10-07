import React, { useState, useEffect } from "react";
import UserScoreCard from "./UserScoreCard";
function ScoreBoard({ family, users, updateUserList }) {
  const [userScores, setUserScores] = useState([]);
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
  }, [family, users]);
  if (!family) return <h1>Login to view your family's score board.</h1>;
  else {
    if (users.length < 1) return <div>Add users to get their scores!</div>;
    else {
      if (userScores.length > 0)
        return (
          <>
            {userScores.map((x) => {
              return <UserScoreCard key={"ScoreCard id" + x.name + x.user_id} updateUserList={updateUserList} userScore={x} users={users} />;
            })}
          </>
        );
      else return <div>Loading ScoreBoard</div>;
    }
  }
}

export default ScoreBoard;
/*
<Card sx={{ minWidth: 275 }} className={id.toString()}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {location}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2">Worth {points} points!</Typography>
      </CardContent>
      <CardActions>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Completed By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chosenUser}
            label="Completed By"
            onChange={handleChange}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
            </Select>
            <Button onClick={handleCompleteTask}>
              {taskCompleteText}
            </Button>
          </FormControl>
        </CardActions>
      </Card>
*/
