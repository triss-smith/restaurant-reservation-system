import React from "react";

function Reservations({ reservations }) {
  
  const reservationsMap = reservations.map((element, index) => {
    return (
      
        <div className="card m-3 p-3 text-white bg-dark card-width align-self-center col-lg-3" >
          <div className="card-body">
            <p>{element.first_name} {element.last_name}</p>
            
            <p>{element.mobile_number}</p>
            <p>{element.reservation_date}</p>
            <p>{element.reservation_time.slice(0,5)}</p>
            <p>{element.people}</p>
          </div>
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
