import React from "react";
import {useHistory} from "react-router-dom"
function ReservationForm({ formData, setFormData, handleSubmit, errors, setErrors }) {
    const history = useHistory();

    /*handleChange
   * handles the data inputted from the form input elements. Takes the target element's name and value attributes(corresponding with formData)
   * and updates formData
   */
  const handleChange = ({ target }) => {
    if (errors) {
      setErrors([]);
    }
    if (target.name === "people") {
      return setFormData({ ...formData, [target.name]: Number(target.value) });
    }
    setFormData({ ...formData, [target.name]: target.value });
  };
  /*cancelRedirect
   * simple function to handle the push to the previous page on cancel
   */
  function cancelRedirect() {
    history.goBack();
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="py-4 formStyle" autoComplete="off">
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="search"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required={true}
            className="form-control"
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required={true}
            className="form-control"
            placeholder="Last Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            name="mobile_number"
            type="tel"
            value={formData.mobile_number}
            onChange={handleChange}
            onBlur={() => {
              if (formData.mobile_number !== "") {
                if (formData.mobile_number.length === 10) {
                  const formatted = `${formData.mobile_number.slice(
                    0,
                    3
                  )}-${formData.mobile_number.slice(
                    3,
                    6
                  )}-${formData.mobile_number.slice(6)}`;
                  setFormData({ ...formData, mobile_number: formatted });
                }
              }
            }}
            required={true}
            maxLength="12"
            placeholder="ex. 1234567890"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation_date">Date of Reservation:</label>
          <input
            type="date"
            name="reservation_date"
            className="form-control"
            value={formData.reservation_date}
            onChange={handleChange}
            required={true}
            maxLength="10"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">Time of Reservation:</label>
          <input
            type="time"
            name="reservation_time"
            className="form-control"
            value={formData.reservation_time}
            onChange={handleChange}
            required={true}
            maxLength="8"
          />
        </div>
        <div className="form-group">
          <label htmlFor="people">Party Size:</label>
          <input
            className="form-control"
            name="people"
            value={formData.people}
            type="number"
            min="1"
            onChange={handleChange}
            default="1"
            required={true}
          />
        </div>
        <div
          className="btn-group btn-group-lg d-flex justify-content-center py-5"
          role="group"
          aria-label="..."
        >
          <button className="btn btn-primary mx-2 w-50" type="submit">
            Submit Here!
          </button>
          <button className="btn btn-danger mx-2 w-50" onClick={cancelRedirect}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
