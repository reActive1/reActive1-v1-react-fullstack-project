import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainingSchema = new Schema({
    name: String, // given name by user 
    createdAt: Date,
    author: String, // - maybe should be user id ?
    isRandom: Boolean, 
    totalTimeSec: Number, 
    exerciseList: [{ exerciseId: String, exerciseName: String, duration: Number, repeats: Number}],  // duration instead time. maybe remove exerciseName
});

export default mongoose.model('trainings', trainingSchema);

