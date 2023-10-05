import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import UserList from "./UserList";
function AddFamilyMembers({ family, users, updateUserList }) {
  const [refreshPage, setRefreshPage] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(50),
  });
  function handleSubmit(values, { resetForm }) {
    values["family_id"] = family.id;
    if (users.length < 1) values["head_of_household"] = true;

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
        if (!data) return null;
        if (data.hasOwnProperty("error")) {
          setErrorMsgs(...errorMsgs, [data["error"]]);
          return null;
        } else {
          setErrorMsgs([]);
          resetForm();
          updateUserList();
          setRefreshPage(!refreshPage);
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
