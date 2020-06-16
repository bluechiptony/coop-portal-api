let tableName = "staff";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("staff_id").primary();
    table.string("staff_code", 50).notNullable();
    table.string("staff_number", 50).nullable();
    table.string("first_name").notNullable();
    table.string("middle_name").nullable();
    table.string("last_name").notNullable();
    table.string("gender").notNullable();
    table.date("date_of_birth").notNullable();
    table.string("state_of_origin").notNullable();
    table.string("lga_of_origin").notNullable();
    table.string("profile_url").nullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
