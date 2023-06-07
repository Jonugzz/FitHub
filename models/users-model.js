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
    },
    addExer : function(email, exer){
        return userModel
        .findOne({email})
        .then(user => {
            user.exercices.push(exer);
            user.save();
            return user;
        })
        .catch(err => {
            throw new Error(err.message);
        });
    }, 
    getUserE : function(email){
        return userModel
        .findOne({email})
        .populate('exercices')
        .then(userEx => {
            return userEx;
        })
        .catch(err => {
            throw new Error(err.message);
        });
    },
    delUserExer : function(email, exer_id){
        return userModel
        .findOne({email})
        .then(user => {
            user.exercices.pull(exer_id);
            user.save();
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
