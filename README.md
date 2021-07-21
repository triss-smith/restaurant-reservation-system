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

- ### Creating Reservations

![Periodic Tables Restaurant Reservation System - Google Chrome 7_20_2021 10_55_25 PM](https://user-images.githubusercontent.com/44349470/126428593-d4a10f56-60ce-4037-a139-abf65958adba.png)

- ### Editing Reservations

![Periodic Tables Restaurant Reservation System - Google Chrome 7_20_2021 10_55_44 PM](https://user-images.githubusercontent.com/44349470/126428648-2a4e4eb7-7289-480c-b2f7-f737c6e77f1d.png)

- ### Cancelling Reservations

![Periodic Tables Restaurant Reservation System - Google Chrome 7_20_2021 10_58_36 PM](https://user-images.githubusercontent.com/44349470/126428717-0fe867c2-27ae-4165-947b-6cffd51a9bb9.png)

- ### Reservation Lookup with Mobile Number Search

![Periodic Tables Restaurant Reservation System - Google Chrome 7_20_2021 10_55_18 PM](https://user-images.githubusercontent.com/44349470/126428733-ccb84ca2-9e62-4022-b086-182b0b84b8bc.png)

- ### Creating Tables

![Periodic Tables Restaurant Reservation System - Google Chrome 7_20_2021 10_55_34 PM](https://user-images.githubusercontent.com/44349470/126428747-9897bbaa-7c38-4fa1-bb84-3ff3e8aa6a11.png)

- ### Seating Reservations at Tables

![Periodic Tables Restaurant Reservation System - Google Chrome 7_20_2021 10_55_56 PM](https://user-images.githubusercontent.com/44349470/126428762-20180b75-aaad-4210-8268-050a14e7201a.png)

- ### Displaying Reservations and Tables on an Easy-To-Use Dashboard

![Periodic Tables Restaurant Reservation System - Google Chrome 7_20_2021 10_55_07 PM](https://user-images.githubusercontent.com/44349470/126428782-9a313414-c690-48b5-b2f9-dfbe3a4e3a8c.png)


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



