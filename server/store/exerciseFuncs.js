import mongoose from 'mongoose';
import * as exerciseModel from '../models/Exercise.js'; 

const Category = mongoose.model("categories");
const Exercise = mongoose.model("exercises");


async function createCategory(name){
    const category = new Category({name: "aaa"});
    category.save();
    console.log("new category: ", category)
}

async function getCategoryByName(name){
    return await Category.findOne({name: name});
}

async function createExercise(newExercise){
    const category = getCategoryByName(newExercise.name);
    const exercise = new Exercise({name: newExercise.name,category: category,imgSource: newExercise.imgSource});
    exercise.save();
    return exercise.id;
}

async function getExerciseByName(name){
    const ex = await Exercise.findOne({name: name});
    console.log("new ex: ", ex, "id: ", ex.id)
    return ex;
}

async function getExerciseById(id){
    const ex = await Exercise.findById(id);
    console.log("new ex: ", ex, "id: ", ex.id)
    return ex;
}

export { createCategory, createExercise, getExerciseByName };

