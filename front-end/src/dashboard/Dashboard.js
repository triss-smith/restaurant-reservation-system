import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import Reservations from "../reservations/Reservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    if (reservations === []) {
      listReservations(today(), abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    } else {
      listReservations(date, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    }
    return () => abortController.abort();
  }
  useEffect(loadDashboard, [date]);

  function nextDayHandler() {
    setDate(() => next(date));
    
  }

  function todayHandler() {
    setDate(today());
  }

  function previousDayHandler() {
    setDate(() => previous(date));
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <h2>{date}</h2>
      <div className="d-md-flex-2 mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div
        className="btn-group btn-group-lg d-flex justify-content-center py-5"
        role="group"
        aria-label="..."
      >
        <button className="btn btn-info" onClick={previousDayHandler}>
          Previous Day
        </button>
        <button className="btn btn-primary" onClick={todayHandler}>
          Today
        </button>
        <button className="btn btn-info" onClick={nextDayHandler}>
          Next Day
        </button>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Reservations reservations={reservations} />
        </div>
        <div className="col-md-6"></div>
      </div>
    </main>
  );
}

export default Dashboard;
