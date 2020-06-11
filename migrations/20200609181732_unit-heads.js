let tableName = "unit_heads";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("lga_id").primary();
    table.string("unit_code", 50).notNullable();
    table.string("staff_code").notNullable();
    table.date("created_date").notNullable();
    table.date("updated_date").notNullable();
    table.text("created_by");
    table.text("updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
