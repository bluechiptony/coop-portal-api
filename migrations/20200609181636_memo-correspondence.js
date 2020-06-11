let tableName = "memo_correspondence";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("memo_correspondence_id").primary();
    table.text("memo_code").notNullable();
    table.text("response_code").notNullable();
    table.text("response").notNullable();
    table.text("email_address").notNullable();
    table.text("full_name").notNullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
