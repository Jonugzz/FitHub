const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : { 
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    exercices : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'exercices'
    }]
});

const userModel = mongoose.model('users', userSchema);

var Users = {
    createUser : function(newUser){
        return userModel
        .create(newUser)
        .then(user => {
            return user;
        })
        .catch(err => {
            throw new Error(err.message);
        });
    },
    getUser : function(email){
        return userModel
        .findOne({email})
        .then(user => {
            return user;
        })
        .catch(err => {
            throw new Error(err.message);
        });
    }
}

module.exports = {
    Users
};
