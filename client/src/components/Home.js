import React from "react";
import Login from "./Login";
import Signup from "./Signup";
function Home({ family }) {
  if (family) return <div>Welcome, members of the {family.family_name} household!</div>;
  else return <Login />;
}
export default Home;
