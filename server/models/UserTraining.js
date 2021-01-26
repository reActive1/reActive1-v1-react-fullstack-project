import mongoose from 'mongoose';

const { Schema } = mongoose;


const userTrainingSchema = new Schema({
    userId: String,
    trainingId: String,
    startTime: Date,
    totalTimeSec: Number, 
});

const userTraining = mongoose.model('userTraining', userTrainingSchema);

export default { userTraining };