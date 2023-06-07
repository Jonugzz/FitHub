const { AutoIncrement } = require('../config');
const mongoose = require('mongoose');

const exercieSchema = mongoose.Schema({
    title_exer : {
        type : String,
        required : true
    },
    muscle_exer : {
        type : String,
        required : true
    },
    equipment : {
        type : String,
        required : true
    },
    min_img_url : {
        type : String,
        required : true
    },
    anim_img_url : {
        type : String,
        required : true
    }
});

const exerCollection = mongoose.model('exercices', exercieSchema);

var Exercices = {
    createExer : function( newExer ) {
        return exerCollection
            .create(newExer)
            .then(createdExer => {
                return createdExer;
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    getById : function(_id){
        return exerCollection
        .findOne( {_id : _id} )
        .then( exer => {
            return exer;
        })
        .catch( err => {
            throw new Error( err );
        });
    },
    getAllExercices : function(){
        return exerCollection
            .find()
            .then(allExer => {
                return allExer;
            })
            .catch(err => {
                return err;
            });
    },
    editExer : function(_id, upExer){
        return exerCollection
            .findOneAndUpdate( {_id : _id}, upExer )
            .then( nExer => {
                return nExer;
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    delExer : function(_id){
        return exerCollection
            .findOneAndDelete( {_id : _id} )
            .then( exer => {
                return exer;
            })
            .catch( err => {
                throw new Error( err );
            });
    }
}

module.exports = { Exercices };
