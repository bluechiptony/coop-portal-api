let tableName = "zonal_command_staff";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("zonal_command_staff_id").primary();
    table.string("zonal_command_code", 50).notNullable();
    table.string("staff_code", 20).notNullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
