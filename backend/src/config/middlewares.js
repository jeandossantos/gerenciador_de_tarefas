const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

module.exports = app => {

    app.use(cors({ methods: ['POST', 'PUT', 'GET', 'DELETE'] }));
    app.use(helmet());
    app.use(morgan(':method :url :status'));
}