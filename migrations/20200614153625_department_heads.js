let tableName = "department_heads";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("unit_head_id").primary();
    table.string("department_code", 20).notNullable();
    table.string("staff_code").notNullable();
    table.string("user_code").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email_address").notNullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
