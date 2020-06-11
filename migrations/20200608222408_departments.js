let tableName = "departments";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("department_id").primary();
    table.string("department_code", 50).notNullable();
    table.string("department_name", 100).notNullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
