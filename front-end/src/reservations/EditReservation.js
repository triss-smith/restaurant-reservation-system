import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { readReservation, editReservation } from "../utils/api"
import ValidationError from "../layout/ValidationError"
import ReservationForm from './ReservationForm';

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
          <ReservationForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} errors={errors} setErrors={setErrors}/>
          </div>
      );
    
}

export default EditReservation;