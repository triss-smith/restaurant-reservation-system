import React, { useState } from "react";
import {postReservation} from "../utils/api";
import {useHistory} from "react-router-dom"


function NewReservation({previous}) {
    const history = useHistory();
    const defaultForm = {
        first_name: "",
        last_name: "", 
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }
    const [formData, setFormData] = useState({
        ...defaultForm
    })

    const handleChange = ({target}) => {
        
        setFormData({...formData,[target.name]:target.value })
    }
    function cancelRedirect() {
        history.push(previous);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        console.log("submitted", formData);
        await postReservation(formData);
        setFormData(defaultForm)

    }
  return (
  <div>
  <form onSubmit={handleSubmit}>
      <label className="formStyle">
        First Name:
      </label>
      <input 
      name="first_name"
      value={formData.first_name}
      onChange={handleChange}
      required={true}
      />  
      <br></br>   
      <label className="formStyle">
        Last Name:
      </label>
      <input 
      name="last_name"
      value={formData.last_name}
      onChange={handleChange}
      required={true}
      />  
      <br></br>   
        <label className="formStyle">
            Mobile Number:
        </label>
        <input 
        name="mobile_number"
        type="tel"
        value={formData.mobile_number}
        onChange={handleChange}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required={true}
        />
        <br></br>
        <label className="formStyle">
            Date of Reservation:
        </label>
        <input 
        name="reservation_date"
        value={formData.reservation_date}
        onChange={handleChange}
        required={true}
        />
        <br></br>
        <label className="formStyle">
            Time of Reservation:
        </label>
        <input 
        name="reservation_time"
        value={formData.reservation_time}
        onChange={handleChange}
        required={true}
        />
        <br></br>
        <label className="formStyle">
            Number of people:
        </label>
        <input className="formStyle"
        name="people"
        value={formData.people}
        onChange={handleChange}
        required={true}
        />
        <br></br>
        <button className="btn btn-primary" type="submit">Submit Here!</button>
  </form>
          <button className="btn btn-danger" onClick={cancelRedirect}>Cancel</button>
    </div>
  )
}

export default NewReservation;
