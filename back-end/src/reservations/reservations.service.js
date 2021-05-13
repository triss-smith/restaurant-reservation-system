const knex = require("../db/connection")
function create(reservation) {
    return knex("reservations").insert(reservation).returning(reservation);
}

module.exports = {
    create,
}