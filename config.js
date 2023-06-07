const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb://localhost/fithubdb';
const PORT = 8080;

const connection = mongoose.createConnection(DATABASE_URL);


module.exports = {
    DATABASE_URL,
    PORT,
    connection,
};


/*module.exports = {
    DATABASE_URL : 'mongodb://localhost/fithubdb',
    PORT : 8080
};*/