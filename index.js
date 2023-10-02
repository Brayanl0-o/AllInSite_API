const app = require('./app')
const database = require('./database')
const mongoose = require('mongoose')

require(`dotenv`).config()

const port = 3000 // conectec in port
app.listen(port, () => {
    console.log('Listening on: ' + 'http://localhost:' + port)
});


