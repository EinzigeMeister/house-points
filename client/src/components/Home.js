import React from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Home({ family }) {
  if (family) return <div>Welcome, members of the {family.family_name} household!</div>;
  else {
    return <Redirect push to="/login" />;
  }
}
export default Home;
