
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.text('initiais', 2).notNullable();
        table.text('email').notNullable().unique();
        table.text('password').notNullable();
        table.boolean('admin').defaultTo(false);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updateAt').defaultTo(knex.fn.now());
        table.timestamp('deletedAt');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
