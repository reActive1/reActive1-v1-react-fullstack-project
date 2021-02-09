import mongoose from 'mongoose';
import * as exerciseModel from '../models/Exercise.js';

const Category = mongoose.model('categories');
const Exercise = mongoose.model('exercises');

async function createCategory(newCategory) {
	const category = new Category({ name: newCategory.name });
	category.save();
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
    return await Exercise.find();
}

async function getExercisesGroupByCategory() {
    const exercises = await Exercise.find();
    const res = groupExercisesByCat(exercises, 'category')
	return res;
}

function groupExercisesByCat(exercises, category){
    return exercises.reduce((dict, obj) => {
        let key = obj[category]
        if (!dict[key]) {
            dict[key] = []
        }
        dict[key].push({name: obj.name, imgSource: obj.imgSource})
        return dict
      }, {})
}

export { createCategory, createExercise, getExercisesByCategory, getAllExercises, getAllCategories, getExercisesGroupByCategory };
