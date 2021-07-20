import React, {useState} from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../reservations/NewReservation"
import NewTable from "../tables/NewTable"
import SeatTable from "../tables/SeatTable"
import MobileNumberSearch from "../reservations/MobileNumberSearch";
import EditReservation from "../reservations/EditReservation";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/search">
      <MobileNumberSearch date={date}/>
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route path="/reservations/:reservationId/seat">
        <SeatTable date={date} setDate={setDate}/>
      </Route>
      <Route exact={true} path="/reservations">
      <Dashboard date={date} setDate={setDate}/>
      </Route>
      <Route path="/reservations/new">
        <NewReservation date={date} setDate={setDate}/>
      </Route>
      
      
      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate} />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
