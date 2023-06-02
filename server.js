const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const bycrypt = require('bcrypt');
const {DATABASE_URL, PORT } = require('./config');
const { Exercices } = require('./models/exer-model');
const { Users } = require('./models/users-model');

const app = express();
const jsonParser = bodyParser.json();

var path = require('path');
app.use(express.static('public'));
app.use(morgan('dev'));

//routes
//home
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//create user
app.post('/fithub/register', jsonParser, (req,res) => {
    let { email , password } = req.body;

    if(!email || !password){
        res.statusMessage = "Faltan datos para crear al usuario";
        return res.status(406).end();
    }

    bycrypt.hash(password, 10)
        .then(hassedpass => {
            let newUser = {
                email,
                password : hassedpass
            };

            Users
                .createUser(newUser)
                .then(result => {
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = "El email ya esta en uso";
                    return res.status(400).end()
                });
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        });
});

//login
app.post('/fithub/login', jsonParser, (req,res) => {
    let { email , password } = req.body;

    if(!email || !password){
        res.statusMessage = "Faltan datos";
        return res.status(406).end();
    }

    Users
        .getUser(email)
        .then(user => {
            if(user == null){
                res.statusMessage = "No hay cuenta registrada con ese email";
                return res.status(406).end();
            }
            bycrypt.compare(password, user.password)
            .then(result => {
                if(result) {
                    let userData = {
                        email : user.email
                    };
                    return res.status(200).json(userData)
                }
                else {
                    res.statusMessage = "Credenciales invalidas";
                    return res.status(400).end();
                }
            })
            .catch(err => {
                res.statusMessage = err.message;
                return res.status(400).end();
            });
        });
});

//create exercice
app.post('/fithub/newExer', jsonParser, (req,res) => {
    let { 
        id,
        title_exer, 
        muscle_exer,
        equipment, 
        min_img_url, 
        anim_img_url } = req.body;

    if(!id || !title_exer || !muscle_exer || !equipment || !min_img_url || !anim_img_url){
        res.statusMessage = "Faltan parametros en la request";
        return res.status(406).end();
    }

    let newExer = {
        id,
        title_exer, 
        muscle_exer,
        equipment, 
        min_img_url, 
        anim_img_url
    }

    Exercices
        .createExer(newExer)
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Algo salio mal. Vuelva a intentarlo";
            return res.status(500).end()
        });
    
});

//get exercise by id
app.get('/fithub/exer/:id', (req,res) => {
    let eid = req.params.id
    Exercices
        .getById(eid)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = `Algo salio mal: ${err.message}`;
            return res.status(400).end()
        });
});

//get all exercices
app.get('/fithub/exercices', (req,res) => {
    Exercices
        .getAllExercices()
        .then(result => {
            return res.status(200).json(result);
        })
});

//delete exercise
app.post('/fithub/del_excer', jsonParser, (req,res) => {
    let { id } = req.body
    Exercices
        .delExer(id)
        .then(exer  => {
            return res.status(200).json(exer);
        })
        .catch(err => {
            res.statusMessage = `Algo salio mal: ${err.message}`;
            return res.status(400).end()
        });
});

//edit exercise
app.put('/fithub/edit_excer/:id', jsonParser, (req,res) => {
    let oid = req.params.id
    let { 
        id,
        title_exer, 
        muscle_exer,
        equipment, 
        min_img_url, 
        anim_img_url } = req.body;

    if(!id || !title_exer || !muscle_exer || !equipment || !min_img_url || !anim_img_url){
        res.statusMessage = "Faltan parametros en la request";
        return res.status(406).end();
    }

    let newExer = {
        id,
        title_exer, 
        muscle_exer,
        equipment, 
        min_img_url, 
        anim_img_url
    }

    Exercices
        .editExer(oid, newExer)
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Algo salio mal. Vuelva a intentarlo";
            return res.status(500).end()
        });
    
});

app.listen(PORT, () => {
    console.log("Server runing on port " + PORT);

    mongoose.connect(DATABASE_URL, {useNewURLParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected Successfully'))
    .catch((err) => { 
        console.error(err); 
    });
});

