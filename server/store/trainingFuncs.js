import mongoose from 'mongoose';
import * as trainingModel from '../models/Training.js';

const Training = mongoose.model('trainings');

async function createTraining(newTraining) {
	const training = new Training({
		name: newTraining.name,
		createdAt: Date.now(),
		author: newTraining.author,
		restTime: newTraining.restTime,
		isRandom: newTraining.isRandom,
		isSaved: newTraining.isSaved,
		totalTimeSec: newTraining.totalTimeSec,
		exerciseList: newTraining.exerciseList
	});
    training.save();
    
	return training.id;
}

async function getAllTraining() {
    const allTraining = await Training.find();
    
	return allTraining;
}

async function getAllSavedTrainings() {
    const trainings = await Training.find({ isSaved: true });
    
	return trainings;
}

export { createTraining, getAllTraining, getAllSavedTrainings };
