import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postTables } from "../utils/api"

import ValidationError from "../layout/ValidationError";

function NewTable() {
  const history = useHistory();
  const defaultForm = {
    table_name: "",
    capacity: "",
  };
  const [formData, setFormData] = useState({ ...defaultForm });
  const [errors, setErrors] = useState([])
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });

  };
  async function handleSubmit(event) {
      event.preventDefault();
      if(formData.table_name.length <= 1) {
        return setErrors((errors) => [...errors, "Table name must be at least 2 characters long!"])
      }
      if(formData.capacity < 1) {
        return setErrors((errors) => [...errors, "Table must have a capacity of at least 1!"])
      }
    if(formData.table_name === "" || formData.capacity === "") {
        return setErrors((errors) => [...errors, "Must fill data!"])
      }

      postTables(formData).then(() => {history.push("/dashboard")}
      )

  }
  function cancelRedirect() {
      history.goBack();
  }
  return (
    <div className="d-flex-1  pt-3">
      <h1 className="display-4 text-center py-1">New Table</h1>
      <ValidationError errors={errors} setErrors={setErrors}/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_name">Table Name</label>
          <input
            type="text"
            className="form-control"
            name="table_name"
            value={formData.table_name}
            onChange={changeHandler}
            minLength="2"
            required={true}
            placeholder="Table Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="table_name">Capacity</label>
          <input
            type="number"
            className="form-control"
            name="capacity"
            value={formData.capacity}
            onChange={changeHandler}
            placeholder="Capacity"
            required={true}
          />
        </div>

        <div
          className="btn-group btn-group-lg d-flex justify-content-center py-2"
          role="group"
          aria-label="..."
        >
          <button type="submit" className="btn btn-primary mx-2 w-50">Submit</button>
          <button className="btn btn-danger mx-2 w-50" onClick={cancelRedirect}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NewTable;
