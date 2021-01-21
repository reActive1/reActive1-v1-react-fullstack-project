import mongoose from 'mongoose';
import * as trainingModel from '../models/Training.js'; 

const Training = mongoose.model('trainings');

async function createTraining(newTraining){
    const training = new Training({ 
        name: newTraining.name,
        createdAt: Date.now(),
        author: newTraining.author,
        isRandom: newTraining.isRandom,
        isSaved: newTraining.isSaved,
        totalTimeSec: newTraining.totalTimeSec,
        exerciseList: newTraining.exerciseList
    });
    console.log("training: ", training)
    training.save();
    console.log("created new training: ", training.id);
    return training.id;
}

async function getTrainingByName(name){
    const training = await Training.findOne({name:name});
    console.log("getTrainingByName-> training: ", training);
    return training;
}

async function getTrainingById(id){
    const training = await Training.findById(id);
    console.log("getTrainingById-> training: ", training);
    return training;
}

async function getAllTraining(){
    const allTraining = await Training.find();
    console.log("getAllTraining-> training list: ", allTraining);
    return allTraining;
}

async function getTrainingsByTimeRange(startTime, endTime){
    const training = await Training.find( { createdAt: { $gt: startTime, $lt: endTime } } )
    console.log("training: ", training)

    return training; 
}

export { createTraining, getTrainingById, getTrainingByName, getAllTraining , getTrainingsByTimeRange}