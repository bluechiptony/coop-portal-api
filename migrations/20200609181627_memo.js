let tableName = "memos";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("memo_id").primary();
    table.text("memo_code").notNullable();
    table.text("memo_title").notNullable();
    table.text("memo_category");
    table.text("memo_origin");
    table.text("memo_description");
    table.text("memo_status");
    table.text("resolved");
    table.text("memo_priority");
    table.text("memo_type");

    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
