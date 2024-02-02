const app = require('./app')
//require to connect the db
const database = require('./database')
// const mongoose = require('mongoose')

require('dotenv').config()

const port = 3000 // conecting in port
app.listen(port, () => {
    console.log('Listening on: ' + 'http://localhost:' + port)
});


