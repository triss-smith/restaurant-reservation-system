import React, { useState } from "react";
import { postReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import ReservationError from "./ReservationError";

function NewReservation({ date, setDate }) {
  const [errors, setErrors] = useState([]);

  const todayDate = new Date();
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
    if (errors) {
      setErrors([]);
    }
    const formDateGet = new Date(
      `${formData.reservation_date} ${formData.reservation_time} `
    );

    console.log(formDateGet.getHours() * 100, formDateGet.getMinutes());

    setFormData({ ...formData, [target.name]: target.value });
  };

  function validHours() {
    
  }

  function cancelRedirect() {
    history.goBack();
  }
  function dateInPast(firstDate, today) {
    const formDate = new Date(firstDate);
    if (formDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
      return true;
    }

    return false;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formDataDate = new Date(`${formData.reservation_date}T00:00:00`);
    const openingTime = 1030;
    const closingTime = 2130;
    const formDateGet = new Date(
      `${formData.reservation_date} ${formData.reservation_time} `
    );

    const formDate = formDateGet.getHours() * 100 + formDateGet.getMinutes();
    if(formDate < openingTime) {
     return  setErrors((errors) => [...errors, "Error: Before opening time!!"]);
      
    }
    if(formDate > closingTime) {
      return setErrors((errors) => [...errors, "Error: After reservation cutoff time"])
    }
    
    if (dateInPast(formData.reservation_date, todayDate)) {
      if (formDataDate.getDay() === 2) {
        setErrors((errors) => [...errors, "Date is on Tuesday"]);
      }
      return setErrors((errors) => [...errors, "Date in past"]);
    }
    if (formDataDate.getDay() === 2) {
      return setErrors((errors) => [...errors, "Date is on Tuesday"]);
    }
    setDate(formData.reservation_date);
    postReservation(formData).then(() =>
      history.push(`/dashboard?date=${date}`)
    );
  }


  return (
    <div className="d-flex-1">
      <ReservationError errors={errors} setErrors={setErrors}/>
      <form onSubmit={handleSubmit} className="py-4">
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
              onBlur={() => {
                if(formData.mobile_number != "") {
                  if(formData.mobile_number.length == 10){
                const formatted = `${formData.mobile_number.slice(0,3)}-${formData.mobile_number.slice(3,6)}-${formData.mobile_number.slice(6)}`
                setFormData({...formData, mobile_number: formatted})
                console.log(formatted)
                  }
                }
              }}
              required={true}
              maxLength="12"
              placeholder="ex. 1234567890"
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
              maxLength="10"
            />
            <br></br>
            <label className="formStyle">Time of Reservation:</label>
            <input
              name="reservation_time"
              value={formData.reservation_time}
              onChange={handleChange}
              required={true}
              maxLength="5"
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
          <div
            className="btn-group btn-group-lg d-flex justify-content-center py-5"
            role="group"
            aria-label="..."
          >
            <button className="btn btn-primary mx-2 w-50" type="submit">
              Submit Here!
            </button>
            <button
              className="btn btn-danger mx-2 w-50"
              onClick={cancelRedirect}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewReservation;
