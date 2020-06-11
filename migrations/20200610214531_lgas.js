let tableName = "lgas";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("lga_id").primary();
    table.string("lga_name", 50).notNullable();
    table.integer("state_id").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
