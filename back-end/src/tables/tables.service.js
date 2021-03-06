const knex = require("../db/connection");

function list() {
  return knex("tables").select("*");
}
function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}
function update(tableId, table) {
  return knex("tables")
    .where({ table_id: tableId })
    .update(table)
    .returning("*");
}
function getReservation(reservationId) {
  const integerResId = Number(reservationId);
  return knex("reservations")
    .select("*")
    .where({ reservation_id: integerResId })
    .first();
}
function updateReservation(reservationId, reservation) {
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .update(reservation);
}
function create(table) {
  return knex("tables")
    .insert(table)
    .returning(["table_name", "capacity", "table_id", "reservation_id"]);
}

module.exports = {
  list,
  read,
  update,
  getReservation,
  create,
  updateReservation,
};
