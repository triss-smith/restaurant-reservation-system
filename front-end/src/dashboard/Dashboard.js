import React, { useEffect, useState, useCallback } from "react";
import {  useLocation, Link } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import Reservations from "../reservations/Reservations";
import Tables from "../tables/Tables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);


  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const dateQuery = useQuery()
  const { pathname, search } = useLocation();
  

  /*loadDashboard() 
  *if reservations is empty OR the url does not contain a query, it defaults to loading the reservations for the current date
  *and sets the date state to the current date. useEffect is only needed once in this configuration.
  */
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);    
    
      listReservations(date, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    
      //setDate(dateQuery.get('date'))
      
    
    return () => abortController.abort();
  }

  console.log(date)
 const callBackList =  useCallback(loadDashboard, [date]);
 useEffect(callBackList, [callBackList])
useEffect(() => {
  if (pathname === "/dashboard" && !search) {
    setDate(today()) 
    
  } 
   else {
    //setDate(dateQuery.get('date'))
    setDate(dateQuery.get("date"));
    
  }
}, [pathname, dateQuery, search, setDate])
  /*nextDayHandler, todayHandler, previousDayHandler
  *sets the date state to the proceeding, current, and previous date, respectively using the next() function from ./utils/date-time
  *Called with the Link elements
  */
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
    <main className="h-100">
            <div className="text-center pt-3">
        <h1 className="display-4">Dashboard</h1>

        <div className="d-md-flex-2 mb-3">
          <h4 className="text-muted mb-0">Reservations for:</h4>
        </div>
        <h2 className="display-4">{date}</h2>
      </div>
      <ErrorAlert error={reservationsError} />
      <div
        className="btn-group btn-group-lg d-flex justify-content-center py-5 mx-2"
        role="group"
        aria-label="..."
      >
        <Link  className="btn btn-info px-1" onClick={previousDayHandler} to={`/dashboard?date=${previous(date)}`}>
          Previous
        </Link>
        <Link to={`/dashboard?date=${today()}`} className="btn btn-primary" onClick={todayHandler}>
          Today
        </Link>
        <Link to={`/dashboard?date=${next(date)}`} className="btn btn-info" onClick={nextDayHandler}>
          Next
        </Link>
      </div>
      <div className="row">
        <div className="col-lg-6 reservations_box">
          <Reservations reservations={reservations} date={date} loadDashboard={callBackList}/>
        </div>
        <div className="col-lg-6">
        <Tables date={date} loadDashboard={callBackList}/>
        </div>
        
      </div>
    </main>
  );
}

export default Dashboard;