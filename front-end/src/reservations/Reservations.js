import React from "react";

function Reservations({ reservations }) {
  const sortedReservations = reservations.sort((a, b) =>
    a.reservation_time < b.reservation_time
      ? -1
      : a.reservation_time > b.reservation_time
      ? 1
      : 0
  );
  const reservationsMap = sortedReservations.map((element, index) => {
    return (
      <div key={index}>
        <div class="card">
          <div class="card-body">
            <p>{element.first_name}</p>
            <p>{element.last_name}</p>
            <p>{element.mobile_number}</p>
            <p>{element.reservation_date}</p>
            <p>{element.reservation_time}</p>
            <p>{element.people}</p>
          </div>
        </div>
      </div>
    );
  });
  return <div>{reservationsMap}</div>;
}

export default Reservations;
