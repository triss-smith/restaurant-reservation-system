const knex = require("../db/connection")
const xss = require("xss");

function list(date){
    return knex("reservations").select("*").where({reservation_date: date});
}

function create(reservation) {
    return knex("reservations").insert(reservation).returning("*").then(data => serialize(data[0]));
}
function read(reservationId){
    return knex("reservations").select("*").where({reservation_id:reservationId}).first();
}
function serialize(reservation) {
    const { reservation_id, reservation_date, reservation_time, people } = reservation;
    return {
        first_name: xss(reservation.first_name),
        last_name: xss(reservation.last_name),
        mobile_number: xss(reservation.mobile_number),
        reservation_id, reservation_date, reservation_time, people
    }
}

module.exports = {
    create,
    list,
    read
}