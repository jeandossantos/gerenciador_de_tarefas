const path = require('path');
const configDb = require('./.env');

module.exports = {
    client: 'postgresql',
    connection: { ...configDb.db },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
};
