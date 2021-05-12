import React, { useState } from "react";
//import postReseveration from "./utils/api";



function NewReservation() {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitted", formData);
        setFormData(defaultForm)
    }
  return (<form onSubmit={handleSubmit}>
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
        <input 
        name="people"
        value={formData.people}
        onChange={handleChange}
        required={true}
        />
        <br></br>
        <button type="submit">Submit Here!</button>
  </form>
  )
}

export default NewReservation;
