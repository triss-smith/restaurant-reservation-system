const knex = require("../db/connection")

function list(date){
    return knex("reservations").select("*").where({reservation_date: date});
}

function create(reservation) {
    return knex("reservations").insert(reservation).returning(["first_name", "last_name", "mobile_number", 
    "reservation_date", "reservation_time", "people"]);
}

module.exports = {
    create,
    list
}