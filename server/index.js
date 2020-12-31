import express from 'express';
import { mongoURI } from './config.js';
import mongoose from 'mongoose';
import { router as routeUrls } from "./routes/routes.js";
import cors from "cors";

mongoose.connect(mongoURI);

const app = express();

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

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use('/api',routeUrls);
app.listen(PORT);

