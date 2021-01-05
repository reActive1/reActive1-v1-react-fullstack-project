import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cloudinary from '../utils/cloudinary.js';
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

router.get('/images', async (req, res) => {
    console.log("in server!!!");
    const { resources } = await cloudinary.v2.search
        .expression('folder:samples')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
    console.log(resources);
    const publicIds = resources.map((file) => file.public_id);
    console.log(publicIds);
    res.send(publicIds);
});

router.post('/uploadExerciseImg', async (req, res)=> {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {upload_preset: 'ml_default'});

        res.json({msg: "photo uploaded"})
    } catch (error) {
        console.error(error);
        res.status(500).json({err: "Something went wrong while trying to upload photo"});
    }
});

export { router };