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
  }

  return (
    <div className="d-flex-1  pt-3">
      <h1 className="display-4 text-center py-1">Search</h1>
      <div className="row justify-content-center">
        <div className=" text-center w-75 px-0 justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="input-group py-3 col-lg text-center">
            <input
              type="search"
              name="mobile_number"
              className="form-control"
              placeholder="Enter a customer's phone number"
              value={search.mobile_number}
              onChange={handleChange}
            />
            
          </div>
        </form>
        </div>
      </div>
      <div className="row justify-content-center ">
              <button className="btn btn-outline-primary w-50" type="submit">
                Find
              </button>
            </div>
      <div className="row text">
        <div className="justify-content-center col-lg">
     <Reservations reservations={reservations} date={date} />
     </div>
</div>
    </div>
  );
}

export default MobileNumberSearch;
