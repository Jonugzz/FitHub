const mongoose = require('mongoose');

const exercieSchema = mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
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
    getById : function(id){
        return exerCollection
        .findOne( {id : id} )
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
    editExer : function(id, upExer){
        return exerCollection
            .findOneAndUpdate( {id : id}, upExer )
            .then( nExer => {
                return nExer;
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    delExer : function(id){
        return exerCollection
            .findOneAndDelete( {id : id} )
            .then( exer => {
                return exer;
            })
            .catch( err => {
                throw new Error( err );
            });
    }
    
}

module.exports = { Exercices };

