import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewTable({ reservations }) {
  const history = useHistory();
  const defaultForm = {
    table_name: "",
    capacity: 1,
  };
  const [formData, setFormData] = useState({ ...defaultForm });

  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData);
  };
  return (
    <div className="d-flex-1">
      <h2>New Table</h2>
      <form>
        <div class="form-group">
          <label for="table_name">Table Name</label>
          <input
            type="text"
            class="form-control"
            name="table_name"
            value={formData.table_name}
            onChange={changeHandler}
            minLength="2"
          />
        </div>

        <div class="form-group">
          <label for="table_name">Capacity</label>
          <input
            type="number"
            class="form-control"
            name="capacity"
            value={formData.capacity}
            onChange={changeHandler}
            min="1"
          />
        </div>

        <div
          className="btn-group btn-group-lg d-flex justify-content-center py-5"
          role="group"
          aria-label="..."
        >
          <button className="btn btn-primary mx-2 w-50">Create</button>
          <button className="btn btn-danger mx-2 w-50">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NewTable;
