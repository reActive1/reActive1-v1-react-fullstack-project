import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String, 
    userName: String, 
    email: String,
    password: { type: String, required: true},
    gender: { type: String,
              enum: ['male', 'female'],
              default: 'female' },
    weight: Number,
    height: Number,
});

export default mongoose.model('users', userSchema);

