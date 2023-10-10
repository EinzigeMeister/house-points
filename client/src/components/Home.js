import React from "react";

function Home({ family }) {
  return (
    <>
      {family ? (
        <div key="HomePageFamilyName">Welcome, members of the {family.family_name} household!</div>
      ) : (
        <div>Login to use features in this application</div>
      )}

      <br />
      <br />

      <div>
        If you're new to this site, please go to the Signup page and create a new Family. Otherwise, go to the Login page and login to your family account.
      </div>

      <br />
      <div>In the Add Family page, the first family member is designated as the Head of Household. This gives them privledges such as:</div>
      <ul>
        <li>Adding Family Members</li>
        <li>Adding Tasks</li>
        <li>Deleting Tasks</li>
        <li>Resetting the scoreboard</li>
      </ul>

      <div>
        After adding family members, anytime you log in, you will be able to login to your personal account in the family through the Change Active Member page.
      </div>
      <div>Logging into your personal account gives you the ability to complete a task and like scores in the Score Board</div>

      <br />

      <div>
        Consider picking a date to reset your scoreboard, such as the last day of the month, and awarding the highest scorer with the ability to choose a family
        dinner or event!
      </div>
    </>
  );
}
export default Home;
