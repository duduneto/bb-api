const app = require('./src/config/server.js');
require('./src/config/database.js');
require('./src/config/routes')(app);