import React from "react";
import UserCard from "./UserCard";
function UserList({ users }) {
  if (users.length < 1) {
    return <h1>Project Client</h1>;
  } else
    return (
      <div className="container">
        {users.map((user) => {
          return <UserCard user={user} key={user.id}></UserCard>;
        })}
      </div>
    );
}
export default UserList;
