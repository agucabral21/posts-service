const express = require('express');
const router = require('../routes');

const app = express();

app.use(express.json());
app.use('/', router);

//const PRIVAVE_API_KEY = 'api_key';

module.exports = app;
