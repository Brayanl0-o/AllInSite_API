const mongoose = require('mongoose')
const app = require('./app')

require('dotenv').config()

// Mode strict False
mongoose.set('strict', false);

// Conect to bd using file 'MONGO_DB_URI' environment  variable
mongoose.connect(process.env.MONGO_DB_URI + "/gameSite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) // msgg connect in mongoDB
    .then(() =>
        console.log("Conexion Success to DB"))
    .catch((err) =>
        console.error(err));

// Defining the route to indicate successful connection
app.get('/', (req, res) => {
    res.send('Connected to API ALLIN')
})

module.exports = mongoose.connect;