const express = require('express');
const cors = require('cors');
const app = express();

const game = require('./routers/game')

//Config midldlewares
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,POST,PATCH,PUT,DELETE"
}));

app.use(express.json());

//router global
app.use('/games', game)

module.exports = app;