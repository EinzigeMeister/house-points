import React from "react";

function Home({ family }) {
  if (family) return <div>Welcome, members of the {family.family_name} household!</div>;
  else {
    return <div>Login to use features in this application</div>;
  }
}
export default Home;
