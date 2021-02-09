import mongoose from 'mongoose';
import * as userTrainingModel from '../models/UserTraining.js';

const UserTraining = mongoose.model('userTraining');
const USER = '0000000000000';

async function startTraining(trainingDetails) {
	const userTraining = new UserTraining({
		trainingId: trainingDetails.trainingId,
		userId: `${USER}`, // todo: get user id from auth
		startTime: new Date(),
		totalTimeSec: trainingDetails.totalTimeSec
	});
    userTraining.save();

	return userTraining.id;
}

async function getTrainingsByTimeRange(params) {
	const trainings = await UserTraining.find({
		userId: params.userId,
		startTime: { $gte: params.startTime, $lt: params.endTime }
    });

    return trainings;
}

async function getNumOfTrainingsByUser(userId) {
    const trainings = await UserTraining.find(userId);
	return trainings.length;
}

export { startTraining, getTrainingsByTimeRange, getNumOfTrainingsByUser };
