/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FormControl, Card, Button, CardActions, CardContent, Typography } from "@mui/material";

function ChoreCard({ chore, activeUser, refreshPage, setRefreshPage }) {
  const [disabledColor, setDisabledColor] = useState("Yellow");
  const [taskCompleteText, setTaskCompleteText] = useState("Complete Task");
  const { id = 1, location, title, description, points, frequency } = chore;
  useEffect(() => {
    if (chore.completed_by_user_id) updateTaskState(taskCompleteText, "Green");
    else if (!activeUser) updateTaskState(taskCompleteText, "Grey");
  }, [activeUser, taskCompleteText, disabledColor]);

  function updateTaskState(text = taskCompleteText, color = disabledColor) {
    setDisabledColor(color);
    setTaskCompleteText(text);
    setRefreshPage(!refreshPage);
  }
  function handleCompleteTask() {
    fetch(`/tasks/family/${id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed_by_user_id: activeUser.id }),
    });
    updateTaskState("Completed", "Green");
  }
  function handleDeleteTask() {
    fetch(`/tasks/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    updateTaskState("Deleted", "Grey");
  }
  return (
    <Card sx={{ backgroundColor: "beige", border: 0.5 }}>
      <CardContent>
        <Typography bgcolor={disabledColor} variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          {location}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2">Worth {points} points!</Typography>
        <Typography variant="body2">This should happen {frequency}</Typography>
      </CardContent>
      <CardActions>
        <FormControl>
          <Button onClick={handleCompleteTask}>{disabledColor === "Green" || disabledColor === "Grey" ? "" : taskCompleteText}</Button>
          <Button onClick={handleDeleteTask}>{disabledColor === "Green" || disabledColor === "Grey" ? "" : "Remove Task"}</Button>
        </FormControl>
      </CardActions>
    </Card>
  );
}

export default ChoreCard;
