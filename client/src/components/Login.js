import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from "formik";
import * as yup from "yup";

function Login({ setFamily }) {
  const [refreshPage, setRefreshPage] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);

  let history = useHistory();
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
      fetch("/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, 2),
      })
        .then((r) => {
          if (r.ok) {
            resetForm();
            setRefreshPage(!refreshPage);
            setErrorMsgs([]);
          } else if (r.status === 401) setErrorMsgs(["Invalid username or password"]);
          return r.json();
        })
        .then((data) => {
          if (data[0].hasOwnProperty("family_id")) {
            setFamily(data[0]["family_id"]);
            history.push("/");
          }
        });
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
        <input id="username" name="username" autoComplete="username" onChange={formik.handleChange} value={formik.values.username} />
        <p style={{ color: "red" }}> {formik.errors.username}</p>
        <label htmlFor="password">password</label>
        <br />
        <input type="password" id="password" name="password" autoComplete="current-password" onChange={formik.handleChange} value={formik.values.password} />
        <p style={{ color: "red" }}> {formik.errors.password}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
