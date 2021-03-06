import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cloudinary from '../utils/cloudinary.js';
import * as userStore from '../store/userFuncs.js';
import * as contactStore from '../store/contactFunc.js';
import * as exerciseStore from '../store/exerciseFuncs.js';
import * as trainingStore from '../store/trainingFuncs.js';
import * as userTrainingStore from '../store/userTrainingFuncs.js';
import * as trainingStatistics from '../services/trainingStatics.js';

const router = express.Router();
const ROUNDS = 10;

router.post('/savedTrains', async (req, res) => {
	try {
		const newSavedTrain = {
			name: req.body.trainingName,
			author: req.body.authorTraining,
			restTime: req.body.restTime,
			isRandom: req.body.randomTraining,
			isSaved: req.body.savedTraining,
			totalTimeSec: req.body.totalTrainingTime,
			exerciseList: req.body.chosenExercisesArray
		};
		const data = await trainingStore.createTraining(newSavedTrain);

		res.json(data);
	} catch (error) {
		console.error(error);
		return res.json(err);
	}
});

router.post('/startTraining', async (req, res) => {
	try {
		const train = {
			userId: req.body.userId,
			trainingId: req.body.trainingId,
			totalTimeSec: req.body.totalTrainingTime
		};
        const data = await userTrainingStore.startTraining(train);
        
		res.json(data);
	} catch (error) {
		console.error(error);
		return res.json(err);
	}
});

router.post('/contactUs', async (req, res) => {
	try {
		const newContact = {
			fullName: req.body.fullName,
			email: req.body.email,
			phone: req.body.phone,
			message: req.body.message
		};
		const data = await contactStore.createContact(newContact);

		res.json(data);
	} catch (error) {
		console.error(error);
		return res.json(err);
	}
});

router.post('/signUp', async (req, res) => {
	try {
		const saltPassword = await bcrypt.genSalt(ROUNDS);
		const securePassword = await bcrypt.hash(req.body.password, saltPassword);

		const newUser = {
			name: req.body.name,
			userName: req.body.userName,
			email: req.body.email,
			password: securePassword,
			gender: req.body.gender,
			height: req.body.height,
			weight: req.body.weight
		};
		const data = await userStore.createUser(newUser);

		res.json(data);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.post('/signIn', async (req, res) => {
	try {
		const userName = req.body.userName;
		const password = req.body.password;
		const user = await userStore.getUserByUserName(userName);
		const isPassCorrect = await bcrypt.compare(password, user.password);
		if (isPassCorrect) {
			console.log('password correct!', isPassCorrect);
		} else {
			console.log('password NOOOOOOT correct!', isPassCorrect);
		}
		const result = isPassCorrect ? user.id : -1;

		res.json(result);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.post('/uploadExerciseImg', async (req, res) => {
	try {
		const fileStr = req.body.data;
		const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, { upload_preset: 'ml_default' });

		res.json({ imgUrl: uploadedResponse.url });
	} catch (error) {
		console.error(error);
		res.status(500).json({ err: 'Something went wrong while trying to upload photo' });
	}
});

router.post('/newExercise', async (req, res) => {
	try {
		const newExercise = req.body;
		const exercise = await exerciseStore.createExercise(newExercise);

		res.json(exercise);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.post('/newCategory', async (req, res) => {
	try {
		const newCategory = req.body;
		const category = await exerciseStore.createCategory(newCategory);

		res.json(category);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.get('/exercises', async (req, res) => {
	try {
		const exercises = await exerciseStore.getAllExercises();
		const editedRes = exercises.map((params) => {
			return {
				name: params.name,
				category: params.category.name,
				imgSource: params.imgSource
			};
		});

		res.json(editedRes);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.get('/exercisesGroupByCategory', async (req, res) => {
	try {
		const exercises = await exerciseStore.getExercisesGroupByCategory();
		res.json(exercises);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.get('/categories', async (req, res) => {
	try {
		const categories = await exerciseStore.getAllCategories();
		res.json(categories);
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

		res.json(publicIds);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.get('/allTraining', async (req, res) => {
	try {
		const resources = await trainingStore.getAllTraining();
		res.json(resources);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.get('/allSavedTrainings', async (req, res) => {
	try {
		const resources = await trainingStore.getAllSavedTrainings();
		res.json(resources);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.get('/numOfTrainingsByUser', async (req, res) => {
	try {
        const numOfTrainings = await userTrainingStore.getNumOfTrainingsByUser(req.query);
        res.json({ numOfTrainings : numOfTrainings });
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.get('/numOftrainingsByTimes', async (req, res) => {
	try {
		const trainings = await userTrainingStore.getTrainingsByTimeRange(req.query);
		res.json({ numOfTrainings : trainings.length });
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

router.get('/trainingsOfWeek', async (req, res) => {
	try {
		const trainings = await trainingStatistics.calcTrainingTimeInDateRange(req.query);
		res.json(trainings);
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
});

export { router };
