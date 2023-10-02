const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config()


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_URI + "/gameSite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) // connect in mongoDB
    .then(() =>
        console.log("Conexion to DB"))
    .catch((err) =>
        console.error(err));

app.get('/', (req, res) => {
    res.send('Connected to API games')
})