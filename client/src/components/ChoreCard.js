/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";

import { FormControl, Card, Button, CardActions, CardContent, Typography } from "@mui/material";

function ChoreCard({ chore, activeUser, refreshPage, setRefreshPage }) {
  const [disabledColor, setDisabledColor] = useState("Yellow");
  const [taskCompleteText, setTaskCompleteText] = useState("Complete Task");
  useEffect(() => {
    if (activeUser) {
      if (chore.completed_by_user_id) {
        setDisabledColor("Green");
        setRefreshPage(!refreshPage);
      }
    }
  }, [activeUser, taskCompleteText]);

  const { id = 1, location, title, description, points, frequency } = chore;
  function handleCompleteTask() {
    const completedByUserID = activeUser.id;
    if (completedByUserID === "") return null;
    fetch(`/tasks/family/${id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed_by_user_id: completedByUserID }),
    });
    setTaskCompleteText("Completed");
    setDisabledColor("Green");
    setRefreshPage(!refreshPage);
  }
  function handleDeleteTask() {
    fetch(`/tasks/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    setDisabledColor("Green");
    setRefreshPage(!refreshPage);
  }
  return (
    <Card sx={{ minWidth: 275 }} className={id.toString()}>
      <CardContent>
        <Typography bgcolor={disabledColor} variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {location}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2">Worth {points} points!</Typography>
        <Typography variant="body2">This should happen {frequency}</Typography>
      </CardContent>
      <CardActions>
        <FormControl>
          <Button onClick={handleCompleteTask}>{disabledColor == "Green" ? "" : taskCompleteText}</Button>
          <Button onClick={handleDeleteTask}>{disabledColor == "Green" ? "" : "Remove Task"}</Button>
        </FormControl>
      </CardActions>
    </Card>
  );
}

export default ChoreCard;
