import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
function UserCard({ user }) {
  const { id, name, head_of_household, family_id } = user;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>ID: {id}</ListGroup.Item>
        <ListGroup.Item className="text-capitalize">Head of household? {head_of_household.toString()}</ListGroup.Item>
        <ListGroup.Item>Family ID: {family_id}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default UserCard;
