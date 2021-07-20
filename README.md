# Restaurant Reservation System

## What is this app?

This lightweight app assists in reservation and table management for clients. Utilizing a vertical slice full stack workflow, the 
"Periodic Tables" front end and back end was developed using RESTful API's and best coding practices.

### Key Features

- Creating Reservations
- Editing Reservations
- Cancelling Reservations
- Reservation Lookup with Mobile Number Search
- Creating Tables
- Seating Reservations at Tables
- Displaying Reservations and Tables on an Easy-To-Use Dashboard

## API Documentation

### fetchJson(url, options, onCancel)

Accepts url, options, onCancel parameters.

Facilitates fetches from the backend.

### listReservations(params, signal)

Accepts params and a signal as parameters.

Lists all reservations that do not have a "finished" or "cancelled" status. fetches to the backend
using the "date" search parameters/query in the url and formats the fetched reservations' date and time.

### readReservation(reservation_id, signal)

Accepts a reservation_id and a signal as parameters.

Fetches a specific reservations based on the reservation ID passed in. Formats the fetched reservation's date and time.

### postReservations(data)

Accepts reservation data as a paramater.

Makes a "POST" HTTP fetch to the backend with the reservation data.

### listTables(signal)

Accepts a signal as a parameter.

Lists all tables similar to listReservations.

### postTables(data)

Accepts a table(data) as a parameter.

Makes a "POST" HTTP fetch to the backend with the table data.

### seatTable(table_id, reservationId)

Accepts a table id and a reservation id as paramters.

Uses the table id and reservation id to make a fetch to the backend to change the table status to "occupied" and
the reservation status to "seated".

### finishTable(table_id, reservationId)

Accepts a table id and a reservation id as parameters.

Makes a "DELETE" HTTP fetch to the backend to change the table status to "free" and the reservation status to "finished"

### mobileSearch(mobileNumber)

Accepts a mobile number as a paramter.

Makes a fetch to the backend using the mobile number as a query for the url. This fetches all reservations that match partial
or whole phone numbers and sort reservations by time.

### changeReservationStatus(reservationId, status)

Accepts a reservation id and a desired status as parameters.

This function makes a "PUT" request to the backend to change the reservation(from the reservation id) to any of three desired statuses.

### editReservation(reservationId, reservation)

Accepts a reservation id and an edited Reservation as parameters.

Makes a "PUT" request to the backend with a reservation id and an edited reservation to update the reservation in the database.



## Code Overviews

### Dashboard.js

This component is responsible for displaying reservations for the desired date, defaulted to the current date, and all created tables. This component utilizes the 
useEffect and useCallback React hooks to prevent race conditions while re-rendering the page in the case of the user wanting to view a different date. 
This dashboard features the date, 3 buttons that change the date to the previous day, next day, or change to the current date.

### Reservations.js



### NewReservation.js

This frontend React component is responsible for validating form data inputted by users and performing checks based on parameters like whether or not the restaurant
is closed on the desired reservation date, whether the date is in the past, whether the time has already passed, etc.


