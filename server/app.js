require('dotenv').config();
const express = require('express');
const routes = require('./routes/server');
const DBConnect = require('./DBConfig/DBConfig');
const app = express();
DBConnect();

app.use('/', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})