import mongoose from 'mongoose';

const { Schema } = mongoose;

export const categorySchema = new Schema({
    name: String,
});

const categories = mongoose.model('categories',categorySchema);

export const exerciseSchema = new Schema({
    name: String, 
    category: String, 
    imgSource: String,
});

const exercises = mongoose.model('exercises',exerciseSchema);

export default { categories, exercises};