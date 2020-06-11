let tableName = "nationalities";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.text("num_code").primary();
    table.string("alpha_2_code", 2).notNullable();
    table.string("alpha_3_code", 3).notNullable();
    table.string("en_short_name", 60).notNullable();
    table.string("nationality", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
