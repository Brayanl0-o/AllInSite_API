const express = require('express');
const cors = require('cors');
const app = express();


//Config midldlewares
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,POST,PATCH,PUT,DELETE"
}));

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Connected to API games');
// });

//router global


module.exports = app;