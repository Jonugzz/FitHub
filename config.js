const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/fithubdb';
const PORT = process.env.PORT || 8080;
const SECRET_TOKEN = process.env.SECRET_TOKEN || "secret";
const connection = mongoose.createConnection(DATABASE_URL);


module.exports = {
    DATABASE_URL,
    PORT,
    connection,
    SECRET_TOKEN
};


/*module.exports = {
    DATABASE_URL : 'mongodb://localhost/fithubdb',
    PORT : 8080
};*/