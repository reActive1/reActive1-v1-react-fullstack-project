import mongoose from 'mongoose';
import * as exerciseModel from '../models/Exercise.js';

const Category = mongoose.model('categories');
const Exercise = mongoose.model('exercises');

async function createCategory(newCategory) {
	const category = new Category({ name: newCategory.name });
	category.save();
	console.log('new category: ', category);
}

async function getAllCategories() {
	return await Category.find();
}

async function createExercise(newExercise) {
	const exercise = new Exercise({
		name: newExercise.name,
		category: newExercise.category,
		imgSource: newExercise.imgSource
	});
    exercise.save();
    
	return exercise.id;
}

async function getExercisesByCategory(category) {
    const exercises = await Exercise.find(category);
    
	return exercises;
}

async function getAllExercises() {
	const exercises = await Exercise.find();
	console.log('exercises: ', exercises);
	return exercises;
}

export { createCategory, createExercise, getExercisesByCategory, getAllExercises, getAllCategories };
