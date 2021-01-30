const configDB = require('../../knexfile');
const knex = require('knex');

module.exports = knex(configDB);