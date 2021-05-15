import React, { useState } from "react";
import { postReservation } from "../utils/api";
import { useHistory } from "react-router-dom";

function NewReservation({ date, setDate }) {
  const history = useHistory();
  const defaultForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [formData, setFormData] = useState({
    ...defaultForm,
  });

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  function cancelRedirect() {
    history.goBack();
  }
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted", formData);
    setDate(formData.reservation_date);
    postReservation(formData).then(() =>
      history.push(`/dashboard?date=${date}`)
    );
  }
  return (
    <div className="d-flex-1">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-5">
            <label className="formStyle">First Name:</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required={true}
            />
            <br></br>
            <label className="formStyle">Last Name:</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required={true}
            />
            <br></br>
            <label className="formStyle">Mobile Number:</label>
            <input
              name="mobile_number"
              type="tel"
              value={formData.mobile_number}
              onChange={handleChange}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required={true}
            />
          </div>

          <br></br>
          <div className="col-md-5">
            <label className="formStyle">Date of Reservation:</label>
            <input
              name="reservation_date"
              value={formData.reservation_date}
              onChange={handleChange}
              required={true}
            />
            <br></br>
            <label className="formStyle">Time of Reservation:</label>
            <input
              name="reservation_time"
              value={formData.reservation_time}
              onChange={handleChange}
              required={true}
            />
            <br></br>
            <label className="formStyle">Party Size:</label>
            <input
              className="formStyle"
              name="people"
              value={formData.people}
              onChange={handleChange}
              required={true}
            />
          </div>
          <br></br>
          <div class="btn-group btn-group-lg d-flex justify-content-center" role="group" aria-label="...">
          <button className="btn btn-primary mx-2 w-50" type="submit">
            Submit Here!
          </button>
          <button className="btn btn-danger mx-2 w-50" onClick={cancelRedirect}>
            Cancel
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewReservation;
