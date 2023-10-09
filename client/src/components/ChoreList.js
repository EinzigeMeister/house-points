import React, { useEffect, useState } from "react";
import ChoreCard from "./ChoreCard";
/*
TODO:
[ ] Generate Family chore list
[ ] Filter by not-completed
[ ] 
 */
async function getChores(family, setChoreList) {
  let choreResponse = await fetch(`/tasks/family/${family.id}`);
  let choreJSON = await choreResponse.json();
  setChoreList(choreJSON);
}

function ChoreList({ family, users, activeUser }) {
  const [choreList, setChoreList] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    if (family) {
      getChores(family, setChoreList);
    }
  }, [family, refreshPage]);

  //if (!family) return <div>Login to view Chore List</div>;
  if (family == null) return <div>Please login to view chores</div>;
  if (choreList.length > 0) {
    return (
      <>
        <div style={{ color: "red" }}>
          {users.length === 0 ? "Add some family members to be able to complete tasks" : ""}
          {!activeUser && users.length > 0 ? "Login from the Change Active Member page to complete tasks" : ""}
        </div>
        <div className="container">
          {choreList.map((chore) => {
            return (
              <div className="col-md-2" key={chore.id}>
                <ChoreCard
                  users={users}
                  chore={chore}
                  family={family}
                  activeUser={activeUser}
                  setRefreshPage={setRefreshPage}
                  refreshPage={refreshPage}
                ></ChoreCard>
              </div>
            );
          })}
        </div>
      </>
    );
  } else return <div>No chores added yet!</div>;
}

export default ChoreList;
