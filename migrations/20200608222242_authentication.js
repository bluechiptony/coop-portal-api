let accountTypes = ["ADMINISTRATOR", "SUPPORT", "SUPERVISOR", "STAFF"];
let tableName = "authentication";
exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("auth_id").primary().notNullable();
    table.string("user_code", 20).notNullable();
    table.string("email_address", 30).notNullable();
    table.string("phone_number", 20).nullable();
    table.string("account_type", 20).notNullable();

    table.boolean("active").notNullable();
    table.boolean("enabled").notNullable();
    table.text("wakanda").nullable();
    table.text("verification_code").notNullable();
    table.bigInteger("verification_code_expiry").notNullable();

    table.date("created_date").notNullable(new Date());
    table.date("updated_date").notNullable(new Date());

    table.index("user_code", "auth_user_code");
    table.index("wakanda", "auth_wakanda");
    table.index("verification_code", "auth_verification_code");
    table.index("account_type", "auth_account_type");
    table.index("email_address", "auth_email_address");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
