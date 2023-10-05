import React from "react";
import UserCard from "./UserCard";
function UserList({ users }) {
  if (!users) return <div>No family members created</div>;
  else
    return (
      <div className="container">
        {users.map((user) => {
          return <div key={user.id}>{user.name}</div>;
        })}
      </div>
    );
}
export default UserList;
