
exports.up = function(knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").NotNullable();
    table.string("mobile_number").notNullable();
    table.string("reservation_date").notNullable();
    table.string("reservation_time").notNullable();
    table.integer("people").notNullable();
    table.timestamps("true","true");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("reservations");
};