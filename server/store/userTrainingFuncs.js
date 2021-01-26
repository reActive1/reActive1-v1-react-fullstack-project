import mongoose from 'mongoose';
import * as userTrainingModel from '../models/UserTraining.js'; 

const UserTraining = mongoose.model('userTraining');

async function startTraining(trainingDetails){
    const userTraining = new UserTraining({
        trainingId: trainingDetails.trainingId,
        userId: "0000000000000", // ------------todo: get user id from auth
        startTime: new Date(),
        totalTimeSec: trainingDetails.totalTimeSec
    });
    
    userTraining.save();

    return userTraining.id;
}

async function getTrainingsByTimeRange(params){
    const trainings = await UserTraining.find( { userId: params.userId, startTime: { $gte: params.startTime, $lt: params.endTime } } )

    return trainings; 
}
 
async function getTrainingsByUser(userId){
    const trainings = await UserTraining.find(userId )

    return trainings; 
}

export { startTraining, getTrainingsByTimeRange, getTrainingsByUser };