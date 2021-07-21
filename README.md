# Restaurant Reservation System

https://reservation-system-frontend.herokuapp.com/dashboard

## What is this app? (Summary)

This lightweight app assists in reservation and table management for clients. Utilizing a vertical slice full stack workflow, the 
"Periodic Tables" front end and back end was developed using RESTful API's and best coding practices.

## Installation

Fork and clone this repository. 

Install Dependencies:

`npm install`

To run the front end:

`cd front-end`

`npm run start`

To run the back end (development server):

`cd back-end`

`npm run start:dev`

## Key Features

- Creating Reservations
- Editing Reservations
- Cancelling Reservations
- Reservation Lookup with Mobile Number Search
- Creating Tables
- Seating Reservations at Tables
- Displaying Reservations and Tables on an Easy-To-Use Dashboard

# **API Documentation**

## Front End API

### fetchJson(url, options, onCancel)

Accepts url, options, onCancel parameters.

Facilitates fetches from the backend.

---

### listReservations(params, signal)

Accepts params and a signal as parameters.

Lists all reservations that do not have a "finished" or "cancelled" status. fetches to the backend
using the "date" search parameters/query in the url and formats the fetched reservations' date and time.

---

### readReservation(reservation_id, signal)

Accepts a reservation_id and a signal as parameters.

Fetches a specific reservations based on the reservation ID passed in. Formats the fetched reservation's date and time.

---

### postReservations(data)

Accepts reservation data as a paramater.

Makes a "POST" HTTP fetch to the backend with the reservation data.

---

### listTables(signal)

Accepts a signal as a parameter.

Lists all tables similar to listReservations.

---

### postTables(data)

Accepts a table(data) as a parameter.

Makes a "POST" HTTP fetch to the backend with the table data.

---

### seatTable(table_id, reservationId)

Accepts a table id and a reservation id as paramters.

Uses the table id and reservation id to make a fetch to the backend to change the table status to "occupied" and
the reservation status to "seated".

---

### finishTable(table_id, reservationId)

Accepts a table id and a reservation id as parameters.

Makes a "DELETE" HTTP fetch to the backend to change the table status to "free" and the reservation status to "finished"

---

### mobileSearch(mobileNumber)

Accepts a mobile number as a paramter.

Makes a fetch to the backend using the mobile number as a query for the url. This fetches all reservations that match partial
or whole phone numbers and sort reservations by time.

---

### changeReservationStatus(reservationId, status)

Accepts a reservation id and a desired status as parameters.

This function makes a "PUT" request to the backend to change the reservation(from the reservation id) to any of three desired statuses.

---

### editReservation(reservationId, reservation)

Accepts a reservation id and an edited Reservation as parameters.

Makes a "PUT" request to the backend with a reservation id and an edited reservation to update the reservation in the database.



