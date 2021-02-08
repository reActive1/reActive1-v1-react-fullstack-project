import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cloudinary from '../utils/cloudinary.js';
import * as userStore from '../store/userFuncs.js';
import * as contactStore from '../store/contactFunc.js';
import * as exerciseStore  from '../store/exerciseFuncs.js';
import * as trainingStore from '../store/trainingFuncs.js';
import * as userTrainingStore from '../store/userTrainingFuncs.js';
import * as trainingStatistics from '../services/trainingStatics.js';

const router = express.Router();
const ROUNDS = 10;

router.post('/savedTrains', async (req, res) => {
    try {
        const newSavedTrain = {
            name:req.body.trainingName,
            author:req.body.authorTraining,
            restTime: req.body.restTime,
            isRandom:req.body.randomTraining,
            isSaved:req.body.savedTraining,
            totalTimeSec:req.body.totalTrainingTime,
            exerciseList:req.body.chosenExercisesArray
        };
        await trainingStore.createTraining(newSavedTrain);

        res.json(data);
    } catch (error){
        console.error(error);
        return res.json(err);
    }
});

router.post('/startTraining', async (req, res) => {
    try {
        const train = {
            userId:req.body.userId,
            trainingId:req.body.trainingId,
            totalTimeSec: req.body.totalTrainingTime
        };
        await trainingStore.startTraining(train);

        res.json(data);
    } catch (error) {
        console.error(error);
        return res.json(err);
    }
});

router.post('/contactus', async (req, res) => {
    try {
        const newContact = {
            fullName:req.body.fullName,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message
        };
        await contactStore.createContact(newContact);

        res.json(data);
    } catch (error){
        console.error(error);
        return res.json(err);
    }
});

router.post('/signUp', async (req, res) => {
    try {
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
        await userStore.createUser(newUser);

        res.json(data);
    } catch (error){
        console.error(error);
        return res.json(error);
    }
})

router.post('/signIn', async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        return res.json(error);
    }

});

router.post('/uploadExerciseImg', async (req, res)=> {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {upload_preset: 'ml_default'});

        res.json({imgUrl: uploadedResponse.url})
    } catch (error) {
        console.error(error);
        res.status(500).json({err: "Something went wrong while trying to upload photo"});
    }
});


router.post('/newExercise', async (req, res) => {
    try{
        const newExercise = req.body;
        const exercise = await exerciseStore.createExercise(newExercise);
       
        res.json(exercise);
    } catch (error){
        console.error(error);
        return res.json(error);
    }
});

router.post('/newCategory', async (req, res) => {
    try{
        const newCategory = req.body;
        const category = await exerciseStore.createCategory(newCategory);
       
        res.json(category);
    } catch (error){
        console.error(error);
        return res.json(error);
    }

});

router.get('/exercises', async (req, res) => {
    try {
        const exercises = await exerciseStore.getAllExercises();
        const editedRes = exercises.map(params => {
            return{
              name: params.name,
              category: params.category.name,
              imgSource: params.imgSource
            };
            });
            
        res.send(editedRes);
    } catch (error) {
        console.error(error);
        return res.json(error);
    }
});

router.get('/exercisesByCategory', async (req, res) => {
    try {
        const exercises = await exerciseStore.getExercisesByCategory(req.query);
        const editedExercises = exercises.map(ex => {return {name: ex.name, imgSource:ex.imgSource}});
        
        res.send(editedExercises);
    } catch (error) {
        console.error(error);
        return res.json(error);
    }
});


router.get('/categories', async (req, res) => {
    try {
        const categories = await exerciseStore.getAllCategories();

        res.send(categories);
    } catch (error) {
        console.error(error);
        return res.json(error);
    }
});

router.get('/images', async (req, res) => {
    try {
        const { resources } = await cloudinary.v2.search
        .expression('folder:samples')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
    const publicIds = resources.map((file) => file.public_id);

    res.send(publicIds);
    } catch (error) {
        console.error(error);
        return res.json(error);
    }
});

router.get('/allTraining', async (req, res) => {
    try {
        const resources= await trainingStore.getAllTraining()

        res.send(resources);
    } catch (error){
        console.error(error);
        return res.json(error);
    }
 });

 router.get('/allSavedTrainings', async (req, res) => {
     try {
        const resources= await trainingStore.getAllSavedTrainings()
        
        res.send(resources);
     } catch (error){
        console.error(error);
        return res.json(error);
     }
 });


 router.get('/trainingsByUser', async (req, res) => {
     try {
        const trainings = await userTrainingStore.getTrainingsByUser(req.query);

        res.send(trainings);
     } catch (error){
        console.error(error);
        return res.json(error);
     }

 });

 router.get('/trainingsByTimes', async (req, res) => {
     try {
        const trainings = await userTrainingStore.getTrainingsByTimeRange(req.query);

        res.send(trainings)
     } catch (error){
        console.error(error);
        return res.json(error);
     }
});

 router.get('/trainingsOfWeek', async (req, res) => {
     try{
        const trainings = await trainingStatistics.calcTrainingTimeInDateRange(req.query);

        res.send(trainings)
     } catch (error){
        console.error(error);
        return res.json(error);
     }
 });

export { router };