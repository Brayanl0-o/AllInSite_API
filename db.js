const mongoose = require('mongoose');

mongoose.set('strict', false);

const getConnection = () => {
    return mongoose.connection;
}

module.exports = {
    getConnection
};