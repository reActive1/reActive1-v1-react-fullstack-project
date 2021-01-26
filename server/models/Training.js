import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainingSchema = new Schema({
    name: String, // given name by user 
    createdAt: Date,
    author: String, // - maybe should be user id ?
    restTime: Number,
    isRandom: Boolean,
    isSaved: Boolean,
    totalTimeSec: Number, 
    exerciseList: [{ exerciseId: String, name: String, time: Number, repeats: Number, imgSource: String}],  // duration instead time. maybe remove exerciseName
});

const trainings = mongoose.model('trainings', trainingSchema);

export default { trainings };