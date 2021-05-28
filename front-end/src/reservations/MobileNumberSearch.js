import React, { useState } from "react";
import Reservations from "./Reservations";
import { mobileSearch } from "../utils/api";

function MobileNumberSearch({date}) {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState({
    mobile_number: "",
  });

  function handleChange({ target }) {
    setSearch({
      [target.name]: target.value,
    });
  }

   function handleSubmit(event) {
    event.preventDefault();
    setReservations([])
    mobileSearch(search.mobile_number).then(setReservations).catch(console.log);
    console.log(reservations)
  }

  return (
    <div className="d-flex-1">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="input-group py-3">
            <input
              type="search"
              name="mobile_number"
              className="col-lg-6 form-control"
              placeholder="Enter a customer's phone number"
              value={search.mobile_number}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">
                Find
              </button>
            </div>
          </div>
        </form>
      </div>
     <Reservations reservations={reservations} date={date} />

    </div>
  );
}

export default MobileNumberSearch;
