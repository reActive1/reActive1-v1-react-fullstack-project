import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as userStore from '../store/userFuncs.js';
import * as contactStore from '../store/contactFunc.js';
import * as exerciseStore  from '../store/exerciseFuncs.js';
import * as trainingStore from '../store/trainingFuncs.js';

//-------- here we handle all get, post, etc req

const router = express.Router();
const ROUNDS = 10;


router.post('/contactus', async (req, res) => {
    const newContact = {
        fullName:req.body.fullName,
        email:req.body.email,
        phone:req.body.phone,
        message:req.body.message
    };

    await contactStore.createContact(newContact)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    });
});

router.post('/signup', async (req, res) => {
    const saltPassword = await bcrypt.genSalt(ROUNDS);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);

    const newUser = {
        name:req.body.name,
        userName:req.body.userName,
        email:req.body.email,
        password:securePassword,
        gender:req.body.gender,
        height:req.body.height,
        weight:req.body.weight
    };

    await userStore.createUser(newUser)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    });
})

router.post('/signin', async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await userStore.getUserByUserName(userName);
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (isPassCorrect){
        console.log("password correct!")
    }
    else{
        console.log("password NOOOOOOT correct!")
    }
    const result = isPassCorrect ? user.id : -1
    res.send(result);
});

export { router };