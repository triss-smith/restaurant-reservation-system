import React from "react";

function Reservations({ reservations, date }) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const selectedDate = new Date(`${date}T00:00:00`);
  const reservationsMap = reservations.map((reservation, index) => {
    const reservationDateTime = new Date(`${reservation.reservation_date}T${reservation.reservation_time}`);
    let hours = reservationDateTime.getHours();
    let minutes = (reservationDateTime.getMinutes() < 10) ? `0${reservationDateTime.getMinutes()}` : reservationDateTime.getMinutes();
    const amOrPm = hours >= 12 ? "pm" : "am"
    hours = (hours % 12) || 12;
    const formattedTime = `${hours}:${minutes} ${amOrPm}`
    const formattedDate = `${monthNames[reservationDateTime.getMonth()]} ${reservationDateTime.getDate()}, ${reservationDateTime.getFullYear()}`
    console.log(hours);
    return (
      
        <div className="card m-2 pb-3 text-white bg-dark card-width align-self-center col-lg-5" key={index}>
          <div className="card-body">
            
            <h5 className="card-title text-center">{reservation.first_name} {reservation.last_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted text-center">{reservation.mobile_number}</h6>
            <p className="card-text text-center">{formattedTime}</p>
            <p className="card-text text-center">{formattedDate}</p>
            <p className="card-text text-center">Party of {reservation.people}</p>
            <p className="card-text text-center" data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p>
          </div>
          {reservation.status == "booked" ?  (          <a className="btn btn-primary" href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a>
) : null}
        </div>
      
    );
  });
  console.log(selectedDate.getDay())
  if(selectedDate.getDay() === 2) {
    return(
    <div className="container d-flex-2">
  <div className="row justify-content-center">
    <h2>Closed on Tuesdays</h2>
    </div>
    </div>
    )
  }
  return (
  <div className="container d-flex-2">
  <div className="row justify-content-center">
    {reservationsMap}
    </div>
    </div>
  )
}

export default Reservations;
