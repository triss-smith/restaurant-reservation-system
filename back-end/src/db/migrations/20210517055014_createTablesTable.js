
exports.up = function(knex) {
  return knex.schema.createTable("tables", (table) => {
      table.increments("table_id").primary();
      table.string("table_name");
      table.integer("capacity").notNullable();
      table.integer("reservation_id").references("reservation_id").inTable("reservations");
  })
};
//This does not need the boolean!!!!! `if(reservation_id) {Occupied} else{not occupied}`
exports.down = function(knex) {
  return knex.schema.dropTable("tables");
};
