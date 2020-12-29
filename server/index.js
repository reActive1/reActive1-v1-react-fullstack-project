import express from 'express';
import { mongoURI } from './config.js';
import mongoose from 'mongoose';
//import * as exercise from './models/Exercise.js';
import * as exerciseStore  from './store/exerciseFuncs.js';
import * as trainingStore from './store/trainingFuncs.js';
import * as userStore from './store/userFuncs.js';

mongoose.connect(mongoURI);

const app = express();
const router = express.Router();

/**
 *     const training = new Training({ 
        name: newTraining.name,
        createtAt: Date.now(), 
        author: newTraining.name,
        isRandom: newTraining.isRandom,
        totalTimeSec: newTraining.totalTimeSec,
        exerciseList: newTraining.exerciseList  });
 */

app.get('/', (req,res) => {
    // -- create exercise---------------------------
     // exerciseStore.createCategory("asdf");
    //  const ex = {name: "newEx", category: "asdf", imgSource: "asdfasdf"}
    //  exerciseStore.createExercise(ex);

    // -- create training---------------------------
    // const exerciseList = [{exerciseId: "1", exerciseName: "static belly", duration: 20, repeats: 3, restTime: 10}];
    // const newTraining = {name: "workout1", createdAt: Date.now(), author: "bobi", isRandom: false, totalTimeSec: 180, exerciseList: exerciseList }
    // trainingStore.createTraining(newTraining);
    
    // -- get training-------------------------------
    // trainingStore.getTrainingById("5fdfa6b55aa68874f4801c10") // todo: check
    // trainingStore.getTrainingByName("workout1")

    // -- create user-------------------------------
    // const likedTrainings = [{rate: 1, trainingId: "12312312312321"}, {rate:2, trainingId: "44442312312324"}];
    // const trainingList = [ {trainingId: "12312312312321"},{trainingId: "44442312312324" } , {trainingId: "55552312312324"} ]
    // const newUser = { name: "eyal", userName: "eyal91", password: "12345678", gender: "male", weight: 90, height: 180, 
    //                 likedTrainings: likedTrainings, trainingList: trainingList };
    // userStore.createUser(newUser);
});

app.get('/exercises', async (req,res) =>{
    // exerciseStore.getExercise("newEx");
});

router.post('/signup', (req, res) => {
    const newUser = {
        name:req.body.name,
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        height:req.body.height,
        weight:req.body.weight
    };
    console.log("new User: ", newUser)
    userStore.createUser(newUser);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);


