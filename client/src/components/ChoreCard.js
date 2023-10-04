import React, { useEffect, useState } from "react";

import { FormControl, InputLabel, Select, MenuItem, Card, Button, CardActions, CardContent, Typography } from "@mui/material";

function ChoreCard({ chore, family, users }) {
  const [chosenUser, setChosenUser] = useState("");
  // const [likedBy, setLikedBy] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [taskCompleteText, setTaskCompleteText] = useState("Complete Task");
  useEffect(() => {
    if (family != null) {
      if (chore["completed_by_user_id"] != null) {
        setDisabled(true);
        const completedUser = users.find((user) => user.id === chore["completed_by_user_id"]);
        setChosenUser(completedUser.id);
        console.log(completedUser);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, family, chosenUser]);

  const { id, location, title, description, points } = chore;
  function handleChange(event) {
    setChosenUser(event.target.value);
  }
  function handleCompleteTask(event) {
    const completedByUserID = chosenUser;
    if (completedByUserID === "") return null;
    fetch(`/tasks/${chore.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed_by_user_id: completedByUserID }),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
    setDisabled(true);
    setTaskCompleteText("Completed");
  }
  return (
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
            disabled={disabled}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
            {/* <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
          <Button onClick={handleCompleteTask} disabled={disabled}>
            {taskCompleteText}
          </Button>
        </FormControl>
      </CardActions>
    </Card>
  );
  // return (
  //   // <Card style={{ width: "18rem" }}>
  //   //   <Card.Body>
  //   //     <Card.Title>{title}</Card.Title>
  //   //   </Card.Body>
  //   //   <ListGroup className="list-group-flush">
  //   //     <ListGroup.Item>ID: {id}</ListGroup.Item>
  //   //     <ListGroup.Item className="text-capitalize">Description: {description}</ListGroup.Item>
  //   //     <ListGroup.Item>Frequency: {frequency}</ListGroup.Item>
  //   //     <ListGroup.Item>Location: {location}</ListGroup.Item>
  //   //   </ListGroup>
  //   // </Card>
  //   <div>ChoreCards</div>
  // );
}

export default ChoreCard;
