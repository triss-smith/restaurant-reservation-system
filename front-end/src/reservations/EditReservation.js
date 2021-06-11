import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { readReservation, editReservation } from "../utils/api"
import ValidationError from "../layout/ValidationError"

function EditReservation() {
    const [errors, setErrors] = useState([]);

  const todayDate = new Date();
  const history = useHistory();
    const [formData, setFormData] = useState({
        first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
    });
            const {reservation_id} = useParams();


    function loadReservation() {
        const abortController = new AbortController();
        readReservation(reservation_id, abortController.signal)
        .then(setFormData)
        //.then(setFormData);
    }
    useEffect(        
        loadReservation
    ,[reservation_id])
    

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
      /*dateInPast
       * accepts the date to be checked and the current date.
       * Returns true if the date is in the past, false if not.
       */
      function dateInPast(firstDate, today) {
        const formDate = new Date(firstDate);
        if (formDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
          return true;
        }
    
        return false;
      }
    
      /*handleSubmit
       * main function that handles the final checks to the data.
       * Uses Date.getHours() and Date.getMinutes() to compare the requested time against the invalid time ranges
       * Checks to make sure the date is present or future using dateInPast
       * Sets the date state to the formData's reservation_date to allow for proper redirect and dashboard functionality
       * Calls editReservation from ../utils/api.js
       * On resolve the user is pushed to the dashboard with a query containing the date
       * for display of all reservations for the date provided.
       */
      async function handleSubmit(event) {
        event.preventDefault();
    
        const formDataDate = new Date(
          `${formData.reservation_date}T${formData.reservation_time}`
        );
        const openingTime = 1030;
        const closingTime = 2130;
        const formDateGet = new Date(
          `${formData.reservation_date} ${formData.reservation_time} `
        );
    
        const formDate = formDateGet.getHours() * 100 + formDateGet.getMinutes();
        if (formDate < openingTime) {
          return setErrors((errors) => [...errors, "Error: Before opening time!!"]);
        }
        if (formDate > closingTime) {
          return setErrors((errors) => [
            ...errors,
            "Error: After reservation cutoff time",
          ]);
        }
        if (dateInPast(formDataDate, todayDate)) {
          if (formDataDate.getDay() === 2) {
            setErrors((errors) => [...errors, "Date is on Tuesday"]);
          }
          return setErrors((errors) => [...errors, "Date in past"]);
        }
        if (formDataDate.getDay() === 2) {
          return setErrors((errors) => [...errors, "Date is on Tuesday"]);
        }
        await editReservation(formData.reservation_id, formData).then(() =>{
          //setDate(formData.reservation_date);
          history.push(`/dashboard?date=${formData.reservation_date}`)
        });
      }
    
      return (
        <div className="d-flex-1  pt-3">
          <ValidationError errors={errors} setErrors={setErrors} />
          <h1 className="display-4 text-center ">Edit Reservation</h1>
          <form onSubmit={handleSubmit} className="py-4" autoComplete="off">
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

export default EditReservation;