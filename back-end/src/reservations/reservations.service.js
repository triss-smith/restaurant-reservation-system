const knex = require("../db/connection")
function create(reservation) {
    return knex("reservations").insert(reservation).returning("*");
}

module.exports = {
    create,
}