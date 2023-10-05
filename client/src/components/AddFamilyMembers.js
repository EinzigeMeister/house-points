import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import UserList from "./UserList";
function AddFamilyMembers({ family, users }) {
  const [errorMsgs, setErrorMsgs] = useState([]);

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(50),
  });
  function handleSubmit(values, { resetForm }) {
    fetch(`/users`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values, null, 2),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data.hasOwnProperty("error")) {
          setErrorMsgs(...errorMsgs, [data["error"]]);
          return null;
        } else {
          setErrorMsgs([]);
          resetForm();
        }
      });
  }
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });
  if (!family) return <div>Login to add family members</div>;
  return (
    <div>
      <p>{errorMsgs.length > 0 ? errorMsgs[0] : ""}</p>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">Name</label>
        <br />
        <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
        <p style={{ color: "red" }}> {formik.errors.name}</p>

        <button type="submit">Submit</button>
      </form>
      <UserList users={users} />
    </div>
  );
}

export default AddFamilyMembers;
