let tableName = "staff_employment";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("staff_employment_id").primary();
    table.string("staff_code", 20).notNullable();
    table.string("zonal_command_code", 50).nullable();
    table.string("department_code", 20).nullable();
    table.string("unit_code", 50).nullable();
    table.string("designation", 100).nullable();
    table.string("grade_level", 10).nullable();
    table.string("step", 10).nullable();
    table.date("date_of_employment").nullable();
    table.date("service_retirement_date").nullable();
    table.date("statutory_retitement_date").nullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
