import React, { useEffect, useState } from "react";
import ChoreCard from "./ChoreCard";
/*
TODO:
[ ] Generate Family chore list
[ ] Filter by not-completed
[ ] 
 */
async function getChores(family, setChoreList) {
  let choreResponse = await fetch("http://127.0.0.1:5555/tasks");
  let choreJSON = await choreResponse.json();
  setChoreList(choreJSON);
}

function ChoreList({ family }) {
  const [choreList, setChoreList] = useState([]);
  useEffect(() => {
    // if (family) {
    getChores(family, setChoreList);
    // }
  }, []);
  //if (!family) return <div>Login to view Chore List</div>;

  if (choreList.length > 0) {
    return (
      <div className="container">
        {choreList.map((chore) => {
          return (
            <div className="col-md-2" key={chore.id}>
              <ChoreCard chore={chore}></ChoreCard>
            </div>
          );
        })}
      </div>
    );
  } else return <div>Loading Chores</div>;
}

export default ChoreList;
