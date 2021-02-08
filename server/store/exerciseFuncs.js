import mongoose from 'mongoose';
import * as exerciseModel from '../models/Exercise.js'; 

const Category = mongoose.model("categories");
const Exercise = mongoose.model("exercises");


async function createCategory(newCategory){
    const category = new Category({name: newCategory.name});
    category.save();
    console.log("new category: ", category)
}

async function getCategoryByName(name){
    return await Category.findOne({name: name});
}

async function getAllCategories(){
    return await Category.find();
}

async function createExercise(newExercise){
    const exercise = new Exercise({name: newExercise.name,category: newExercise.category,imgSource: newExercise.imgSource});
    exercise.save();
    return exercise.id;
}

async function getExerciseByName(name){
    const ex = await Exercise.findOne({name: name});
    console.log("new ex: ", ex, "id: ", ex.id)
    return ex;
}

async function getExercisesByCategory(category){
    const exercises = await Exercise.find(category);

    return exercises;
}

async function getExerciseById(id){
    const ex = await Exercise.findById(id);
    console.log("new ex: ", ex, "id: ", ex.id)
    return ex;
}

async function getAllExercises(){
    const exercises = await Exercise.find(); 
    console.log("exercises: ", exercises)

    return exercises;
}

export { createCategory, createExercise, getExerciseByName,getExercisesByCategory, getAllExercises, getAllCategories };

