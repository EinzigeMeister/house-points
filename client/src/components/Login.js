import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Login({ users, setUsers, family, setFamily }) {
  const [refreshPage, setRefreshPage] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]); //use in custom validation for unique username
  //Fetch families to validate unique usernames

  //Update family list after each successful registration
  useEffect(() => {
    console.log(family);
    if (family != null) {
      console.log(family.id);
      fetch(`http://127.0.0.1:5555/users/family/${family.id}`)
        .then((r) => r.json())
        .then((data) => setUsers(data));
    }
    setRefreshPage(false);
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username up to 16 characters").max(16),
    password: yup.string().required("Must enter a password"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((r) => {
          if (r.status === 200) {
            resetForm({ values: "" });
            setRefreshPage(!refreshPage);
            setErrorMsgs([]);
          } else if (r.status === 401) {
            setErrorMsgs(["Invalid username or password"]);
          }
          return r.json();
        })
        .then((data) => setFamily(data));
    },
  });

  return (
    <div>
      {errorMsgs.map((e) => {
        return <div style={{ color: "red" }}>{e}</div>;
      })}
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="username">Username</label>
        <br />
        <input id="username" name="username" onChange={formik.handleChange} value={formik.values.username} />
        <p style={{ color: "red" }}> {formik.errors.username}</p>
        <label htmlFor="password">password</label>
        <br />
        <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
        <p style={{ color: "red" }}> {formik.errors.password}</p>
        <button type="submit">Submit</button>
      </form>
      <table style={{ padding: "15px" }}>
        {" "}
        <tbody>
          {family == null ? (
            <tr>
              <th>Login to view family members</th>
            </tr>
          ) : (
            <>
              <tr>
                <th>Name</th>
              </tr>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>{user.name}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>{" "}
      </table>
    </div>
  );
}

export default Login;
