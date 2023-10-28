const express = require('express');
const cors = require('cors');
const app = express();

const game = require('./routers/videogames/game')
const user = require('./routers/user')
const auth = require('./routers/auth')
const upload = require('./routers/upload')
const uploadImg = require('./routers/videogames/uploadGame')
//Config midldlewares
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,POST,PATCH,PUT,DELETE"
}));
app.use('/uploads/videogames', express.static('uploads/videogames'));
app.use(express.json());


//router global
app.use('/upload', upload )
app.use('/uploadImg', uploadImg )
app.use('/users', user)
app.use('/games', game)
app.use('/auth', auth)
module.exports = app;