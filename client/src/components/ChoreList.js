import React, { useEffect, useState } from "react";
import ChoreCard from "./ChoreCard";
/*
TODO:
[ ] Generate Family chore list
[ ] Filter by not-completed
[ ] 
 */
async function getChores(family, setChoreList) {
  let choreResponse = await fetch(`http://127.0.0.1:5555/tasks/family/${family.id}`);
  let choreJSON = await choreResponse.json();
  setChoreList(choreJSON);
}

function ChoreList({ family, users }) {
  const [choreList, setChoreList] = useState([]);

  useEffect(() => {
    if (family) {
      getChores(family, setChoreList);
    }
  }, [family]);

  //if (!family) return <div>Login to view Chore List</div>;
  if (family == null) return <div>Please login to view chores</div>;
  if (choreList.length > 0) {
    return (
      <div className="container">
        {choreList.map((chore) => {
          return (
            <div className="col-md-2" key={chore.id}>
              <ChoreCard users={users} chore={chore} family={family}></ChoreCard>
            </div>
          );
        })}
      </div>
    );
  } else return <div>Loading Chores</div>;
}

export default ChoreList;
