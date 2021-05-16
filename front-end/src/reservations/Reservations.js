import React from "react";

function Reservations({ reservations }) {
  
  const reservationsMap = reservations.map((element, index) => {
    return (
      <div key={index}>
        <div className="card">
          <div className="card-body">
            <p>{element.first_name} {element.last_name}</p>
            
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
