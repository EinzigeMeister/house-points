import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function UserLogin({ setActiveUser, family, activeUser, users }) {
  const [refreshPage, setRefreshPage] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);

  useEffect(() => {
    setRefreshPage(true);
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name or nickname").max(16),
    password: yup.string().required("Must enter a password").max(50),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      values["family_id"] = family.id;
      fetch("/user_login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((r) => {
          if (r.ok) {
            resetForm();
            setErrorMsgs([]);
          } else if (r.status === 401) {
            setErrorMsgs(["Invalid username or password"]);
          }
          return r.json();
        })
        .then((data) => {
          if (data && !data.hasOwnProperty("error")) {
            setActiveUser(data);
            setRefreshPage(!refreshPage);
          }
        });
    },
  });
  if (!family) return <div>Login to your family to set an active family member</div>;
  if (users.length === 0) return <div>Add family members to login to your family member account</div>;
  return (
    <div>
      {activeUser ? <div>{activeUser.name} is currently logged in.</div> : null}
      {errorMsgs.map((e) => {
        return <div style={{ color: "red" }}>{e}</div>;
      })}
      <div>Enter your family member's login credentials to login to your personal account</div>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">Name</label>
        <br />
        <input id="name" name="name" autoComplete="given-name" onChange={formik.handleChange} value={formik.values.name} />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" id="password" name="password" autoComplete="current-password" onChange={formik.handleChange} value={formik.values.password} />
        <p style={{ color: "red" }}> {formik.errors.password}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserLogin;
