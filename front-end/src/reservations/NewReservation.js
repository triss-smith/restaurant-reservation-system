import React, { useState } from "react";
import { postReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import ReservationError from "./ReservationError";
import moment from "moment";
//import { set } from "../../../back-end/src/app";

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
    if(target.name == "people"){
      return setFormData({...formData, [target.name]:Number(target.value)})
      console.log(formData.people)
    }
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData.reservation_date)
    /*if(target.value.length == 7 && (moment(target.value, ["hh:mmAA"]).isValid())) {
      let formattedTime = moment(target.value, ["h:mmA"]).format("HH:mm")
      
      setFormData({...formData,reservation_time:formattedTime})
      console.log(formData.reservation_time)
    }*/
  };

  function cancelRedirect() {
    history.goBack();
  }
  function dateInPast(firstDate, today) {
    const formDate = new Date(firstDate);
    if (formDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      console.log(formDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0));
      return true;
    }

    return false;
  }
  /*const timeHandler = ({target}) => {
    
    console.log((moment(target.value, ["hh:mmAA"]).isValid()))
    if((moment(target.value, ["hh:mmAA"]).isValid())) {
      let formattedTime = moment(target.value, ["h:mmA"]).format("HH:mm")
      
      setFormData({...formData,reservation_time:formattedTime})
      console.log(formData.reservation_time)
    }
  }*/
  
  async function handleSubmit(event) {
    event.preventDefault();
    if((moment(formData.reservation_time, ["hh:mmAA"]).isValid())) {
      let formattedTime = moment(formData.reservation_time, ["h:mmA"]).format("HH:mm")
      console.log(formattedTime)
     await setFormData({...formData,reservation_time:formattedTime})
    }
    const formDataDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}`
    );
    console.log(formDataDate);
    const openingTime = 1030;
    const closingTime = 2130;
    const formDateGet = new Date(
      `${formData.reservation_date} ${formData.reservation_time} `
    );

    const formDate = formDateGet.getHours() * 100 + formDateGet.getMinutes();
    console.log(formDate)
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
    setDate(formData.reservation_date);
    console.log(formData)
    postReservation(formData).then(() =>
      history.push(`/dashboard?date=${date}`)
    );
  }

  return (
    <div className="d-flex-1">
      <ReservationError errors={errors} setErrors={setErrors} />
      <h2>Create Reservation</h2>
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
              if (formData.mobile_number != "") {
                if (formData.mobile_number.length == 10) {
                  const formatted = `${formData.mobile_number.slice(
                    0,
                    3
                  )}-${formData.mobile_number.slice(
                    3,
                    6
                  )}-${formData.mobile_number.slice(6)}`;
                  setFormData({ ...formData, mobile_number: formatted });
                  console.log(formatted);
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

export default NewReservation;
