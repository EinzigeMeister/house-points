import React from "react";

function UserList({ users }) {
  if (!users) return <div>No family members created</div>;
  else
    return (
      <div className="container">
        {users.map((user) => {
          return (
            <div key={"User id" + user.id + " User name" + user.name}>
              {user.name} {user.head_of_household ? "- Head of household" : ""}
            </div>
          );
        })}
      </div>
    );
}
export default UserList;
