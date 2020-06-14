let tableName = "zonal_commands";
exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("zonal_command_id").primary();
    table.string("zonal_command_code", 50).notNullable();
    table.string("zonal_command_name", 50).notNullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
