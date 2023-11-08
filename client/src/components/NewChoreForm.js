import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewChoreForm({ family, activeUser }) {
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [disableForm, setDisableForm] = useState(true);
  useEffect(() => {
    if (activeUser && activeUser.head_of_household) {
      setDisableForm(false);
    } else setDisableForm(true);
  }, [activeUser, disableForm]);
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name for the chore").max(50),
    description: yup.string().required("Must enter a description for the chore"),
    points: yup.number().required("Must enter a point value").max(100).integer("Must enter a number between 1 and 100").min(1),
    location: yup.string().max(50),
    frequency: yup.string().max(30),
  });
  function handleSubmit(values, { resetForm }) {
    fetch(`/tasks/family/${family.id}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values, null, 2),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.hasOwnProperty("error")) setErrorMsgs(...errorMsgs, [data["error"]]);
        else {
          setErrorMsgs([]);
          resetForm();
        }
      });
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      points: 1,
      location: "",
      frequency: "monthly",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  });
  if (!family) return <div>Login to add a chore</div>;
  return (
    <div>
      <p hidden={!disableForm} style={{ color: "red" }}>
        You must be the head of household to create new chores.
      </p>
      <p>{errorMsgs.length > 0 ? errorMsgs[0] : ""}</p>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <fieldset disabled={disableForm} style={{ border: "none" }}>
          <label htmlFor="name">Chore Name</label>
          <br />
          <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
          <p style={{ color: "red" }}> {formik.errors.name}</p>

          <label htmlFor="description">Chore Description</label>
          <br />
          <input id="description" name="description" onChange={formik.handleChange} value={formik.values.description} />
          <p style={{ color: "red" }}> {formik.errors.description}</p>

          <label htmlFor="frequency">Frequency</label>
          <br />
          <input id="frequency" name="frequency" onChange={formik.handleChange} value={formik.values.frequency} />
          <p style={{ color: "red" }}> {formik.errors.frequency}</p>

          <label htmlFor="location">Location</label>
          <br />
          <input id="location" name="location" onChange={formik.handleChange} value={formik.values.location} />
          <p style={{ color: "red" }}> {formik.errors.location}</p>

          <label htmlFor="points">Points</label>
          <br />
          <input type="number" id="points" name="points" onChange={formik.handleChange} value={formik.values.points} />
          <p style={{ color: "red" }}> {formik.errors.points}</p>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default NewChoreForm;
