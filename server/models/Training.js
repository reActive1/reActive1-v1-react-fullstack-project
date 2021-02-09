import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainingSchema = new Schema({
    name: String, // given name by user 
    createdAt: Date,
    author: String, 
    restTime: Number,
    isRandom: Boolean,
    isSaved: Boolean,
    totalTimeSec: Number, 
    exerciseList: [{ exerciseId: String, name: String, time: Number, repeats: Number, imgSource: String}],  
});

const trainings = mongoose.model('trainings', trainingSchema);

export default { trainings };