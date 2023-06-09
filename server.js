const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const bycrypt = require('bcrypt');
const {DATABASE_URL, PORT, SECRET_TOKEN } = require('./config');
const { Exercices } = require('./models/exer-model');
const { Users } = require('./models/users-model');
const jsonwebtoken = require('jsonwebtoken');

const app = express();
const jsonParser = bodyParser.json();

var path = require('path');
app.use(express.static('public'));
app.use(morgan('dev'));

//routes
//home
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/fithub/validate-token', (req, res) => {
    let token = req.headers.sessiontoken;
    
    jsonwebtoken.verify(token, SECRET_TOKEN, (err, decoded) => {
        if(err) {
            res.statusMessage = "La sesion ha expirado";
            return res.status(409).end();
        }
        return res.status(200).json({
            email : decoded.email
        })
    });
    
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
                    jsonwebtoken.sign(userData, SECRET_TOKEN, {expiresIn : 30}, (err, token) => {
                        if (err) {
                            res.statusMessage = err.message;
                            return res.status(400).end();
                        }
                        return res.status(200).json({token})
                    });
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
        // _id, // Se deja de pedir por el autoincrement
        title_exer, 
        muscle_exer,
        equipment, 
        min_img_url, 
        anim_img_url } = req.body;
        // Se elimino el campo _id requerido
        //if(!_id || !title_exer || !muscle_exer || !equipment || !min_img_url || !anim_img_url){
    if(!title_exer || !muscle_exer || !equipment || !min_img_url || !anim_img_url){
        res.statusMessage = "Faltan parametros en la request";
        return res.status(406).end();
    }

    let newExer = {
        //_id, // Se deja de pedir por el autoincrement
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

//get exercise by _id
app.get('/fithub/exer/:_id', (req,res) => {
    let eid = req.params._id
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
    let { _id } = req.body
    Exercices
        .delExer(_id)
        .then(exer  => {
            return res.status(200).json(exer);
        })
        .catch(err => {
            res.statusMessage = `Algo salio mal: ${err.message}`;
            return res.status(400).end()
        });
});

//edit exercise
app.put('/fithub/edit_excer/:_id', jsonParser, (req,res) => {
    let oid = req.params._id
    let { 
        _id,
        title_exer, 
        muscle_exer,
        equipment, 
        min_img_url, 
        anim_img_url } = req.body;

    if(!_id || !title_exer || !muscle_exer || !equipment || !min_img_url || !anim_img_url){
        res.statusMessage = "Faltan parametros en la request";
        return res.status(406).end();
    }

    let newExer = {
        _id,
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

//add exercise to a user list
//user_id es el email
app.post('/fithub/addUserExer', jsonParser, (req,res) => {
    let { user_id, exer_id } = req.body;
    //user_id es el email del usuario
    if(!user_id || !exer_id){
        res.statusMessage = "Faltan parametros en la request";
        return res.status(406).end();
    }

    Exercices
        .getById(exer_id)
        .then(exer => {
            Users
                .addExer(user_id, exer)
                .then(user => {
                    return res.status(201).json(user);
                })
                .catch(err => {
                    res.statusMessage = err.message;
                    return res.status(400).end();
                })
        })
        .catch(err => {
            res.statusMessage = 'Ejercicio no encontrado';
            return res.status(400).end()
        });
});

//get user exercices
//te regresa un usuario con su arreglo de exercicios y sus parametros
//user_id es el email del usuario
app.get('/fithub/getUserExer', jsonParser, (req,res) => {
    let { user_id } = req.body;

    Users
        .getUserE(user_id)
        .then(user => {
           return res.status(200).json(user);
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end()
        });
});

//delete exercice from a user 
//user_id es el email del usuario
app.post('/fithub/delUserExer', jsonParser, (req,res) => {
    let { user_id, exer_id } = req.body;
    //user_id es el email del usuario
    if(!user_id || !exer_id){
        res.statusMessage = "Faltan parametros en la request";
        return res.status(406).end();
    }

    Exercices
        .getById(exer_id)
        .then(exer => {
            let eid = exer._id;
            Users
                .delUserExer(user_id, eid)
                .then(user => {
                    return res.status(201).json(user);
                })
                .catch(err => {
                    res.statusMessage = err.message;
                    return res.status(400).end();
                })
        })
        .catch(err => {
            res.statusMessage = 'Ejercicio no encontrado';
            return res.status(400).end()
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

