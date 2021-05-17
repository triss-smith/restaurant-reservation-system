import React from "react";
import { Link } from "react-router-dom"
function Reservations({ reservations }) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  
  const reservationsMap = reservations.map((element, index) => {
    const reservationDateTime = new Date(`${element.reservation_date} ${element.reservation_time}`);
    let hours = reservationDateTime.getHours();
    let minutes = (reservationDateTime.getMinutes() < 10) ? `0${reservationDateTime.getMinutes()}` : reservationDateTime.getMinutes();
    const amOrPm = hours >= 12 ? "pm" : "am"
    hours = (hours % 12) || 12;
    const formattedTime = `${hours}:${minutes} ${amOrPm}`
    const formattedDate = `${monthNames[reservationDateTime.getMonth()]} ${reservationDateTime.getDate()}, ${reservationDateTime.getFullYear()}`
    return (
      
        <div className="card m-2 pb-3 text-white bg-dark card-width align-self-center col-lg-5" key={index}>
          <div className="card-body">
            
            <h5 className="card-title text-center">{element.first_name} {element.last_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted text-center">{element.mobile_number}</h6>
            <p className="card-text text-center">{formattedTime}</p>
            <p className="card-text text-center">{formattedDate}</p>
            <p className="card-text text-center">Party of {element.people}</p>
          </div>
          <a className="btn btn-primary" href={`/reservations/${element.reservation_id}/seat`}>Seat</a>
        </div>
      
    );
  });
  return (
  <div className="container d-flex-2">
  <div className="row justify-content-center">
    {reservationsMap}
    </div>
    </div>
  )
}

export default Reservations;
