const express = require('express');
const cors = require('cors');
const app = express();

const game = require('./routers/game')
const user = require('./routers/user')
//Config midldlewares
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,POST,PATCH,PUT,DELETE"
}));

app.use(express.json());


//router global
app.use('/users', user)
app.use('/games', game)

module.exports = app;