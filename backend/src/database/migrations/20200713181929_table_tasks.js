
exports.up = function(knex) {
    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE');
        table.text('name').notNullable();
        table.text('description');
        table.integer('priority', 1).notNullable();
        table.timestamp('deadline').notNullable();
        table.boolean('done').defaultTo(false);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
};
