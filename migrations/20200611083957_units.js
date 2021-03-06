let tableName = "units";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("unit_id").primary();
    table.string("unit_code", 20).notNullable();
    table.string("zonal_command_code", 20).notNullable();
    table.string("department_code", 20).notNullable();
    table.boolean("active").notNullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
