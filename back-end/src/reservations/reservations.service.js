const knex = require("../db/connection");
const xss = require("xss");

function list(date) {
  return knex("reservations").select("*").where({ reservation_date: date });
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((data) => serialize(data[0]));
}
function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}
function update(reservationId, reservation) {
  console.log(reservationId, reservation);
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .update(reservation)
    .returning("*");
}
function updateStatus(reservationId, reservation) {
  console.log(reservationId, reservation);
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .update(reservation)
    .returning("status");
}
function serialize(reservation) {
  const { reservation_id, reservation_date, reservation_time, people } =
    reservation;
  return {
    first_name: xss(reservation.first_name),
    last_name: xss(reservation.last_name),
    mobile_number: xss(reservation.mobile_number),
    reservation_id,
    reservation_date,
    reservation_time,
    people,
  };
}
function search(mobile_number) {
  mobileNumberNoHyphens = mobile_number.replace(/-/g, "");
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobileNumberNoHyphens.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  list,
  read,
  update,
  search,
  updateStatus,
};
