import React from "react";
import { changeReservationStatus } from "../utils/api"
import { useHistory, useLocation } from "react-router-dom"

function Reservations({ reservations, date, loadDashboard }) {
  const {pathname} = useLocation()
  const history = useHistory();
  function cancelReservation(reservationId, status){
    const confirmCancel = window.confirm("Do you want to cancel this reservation? This cannot be undone.")
    if(confirmCancel) {
      changeReservationStatus(reservationId, status).then(loadDashboard);
      history.push(`/reservations?date=${date}`)


    }
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const selectedDate = new Date(`${date}T00:00:00`);
  const reservationsMap = reservations.map((reservation, index) => {
    const reservationDateTime = new Date(
      `${reservation.reservation_date}T${reservation.reservation_time}`
    );
    let hours = reservationDateTime.getHours();
    let minutes =
      reservationDateTime.getMinutes() < 10
        ? `0${reservationDateTime.getMinutes()}`
        : reservationDateTime.getMinutes();
    const amOrPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes} ${amOrPm}`;
    const formattedDate = `${
      monthNames[reservationDateTime.getMonth()]
    } ${reservationDateTime.getDate()}, ${reservationDateTime.getFullYear()}`;
    return (
      <div
        className="card m-2  w-100 text-white elegant-color-dark card-width align-self-center col-lg"
        key={index}
      >
        <div className="row">
          <div className="card-body col-lg-6">
            <h5 className="card-title text-center">
              {reservation.first_name} {reservation.last_name}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted text-center">
              {reservation.mobile_number}
            </h6>
            <p className="card-text text-center">{formattedTime}</p>
            <p className="card-text text-center">{formattedDate}</p>
            <p className="card-text text-center">
              Party of {reservation.people}
            </p>
            <p
              className="card-text text-center"
              data-reservation-id-status={reservation.reservation_id}
            >
              {reservation.status}
            </p>
          </div>
          <div className="col-lg-6 justify-content-center py-2">
            <div className="btn-group-vertical   w-100 h-100 p-0">
              {reservation.status == "booked" ? (
                <button
                  onClick={() => history.push(`/reservations/${reservation.reservation_id}/seat`)}
                  className="btn btn-outline-primary align-self-center w-75 p-1"
                  href={`/reservations/${reservation.reservation_id}/seat`}
                >
                  Seat
                </button>
              ) : null}
              <button className="btn btn-outline-info align-self-center w-75 p-1" onClick={() => history.push(`/reservations/${reservation.reservation_id}/edit`)}href={`/reservations/${reservation.reservation_id}/edit`}>Edit</button>
              <button className="btn btn-outline-danger align-self-center w-75 p-1" onClick={() => cancelReservation(reservation.reservation_id, "cancelled")} data-reservation-id-cancel={reservation.reservation_id}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  });
  if (selectedDate.getDay() === 2 && pathname != "/search") {
    return (
        <div className="py-2 col-lg">
          <h2 className="display-4 text-center py-2">Closed on Tuesdays</h2>
        </div>
    );
  }

  if (reservations.length === 0) {
    return (<div className="py-2 col-lg">
      <h2 className="display-4 text-center py-2">No reservations found</h2>
      </div>);
  }
  return (
    <div className="container d-flex-2">
      <div className="row justify-content-center py-1">{reservationsMap}</div>
    </div>
  );
}

export default Reservations;
