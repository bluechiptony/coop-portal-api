let tableName = "states";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("state_id").primary();
    table.string("state_name", 20).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
