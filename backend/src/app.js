const express = require('express');
const app = express();
const consign = require('consign');
const db = require('./database/connection');

app.connection = db;

app.use(express.json());
 
consign()
    .then('./src/config/passport.js')
    .then('./src/config/middlewares.js')
    .then('./src/api/validation.js')
    .then('./src/api')
    .then('./src/routes.js')
    .then('./src/server.js')
    .into(app)
