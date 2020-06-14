let tableName = "memo_zonal_commands";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("memo_zonal_command_assignment_id").primary();
    table.string("memo_code", 30).notNullable();
    table.string("zonal_command_code", 20).notNullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
