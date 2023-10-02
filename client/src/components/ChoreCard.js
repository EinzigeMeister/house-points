import React from "react";

function ChoreCard({ chore }) {
  const { id, location, title, frequency, description } = chore;
  return (
    // <Card style={{ width: "18rem" }}>
    //   <Card.Body>
    //     <Card.Title>{title}</Card.Title>
    //   </Card.Body>
    //   <ListGroup className="list-group-flush">
    //     <ListGroup.Item>ID: {id}</ListGroup.Item>
    //     <ListGroup.Item className="text-capitalize">Description: {description}</ListGroup.Item>
    //     <ListGroup.Item>Frequency: {frequency}</ListGroup.Item>
    //     <ListGroup.Item>Location: {location}</ListGroup.Item>
    //   </ListGroup>
    // </Card>
    <div>ChoreCards</div>
  );
}

export default ChoreCard;
