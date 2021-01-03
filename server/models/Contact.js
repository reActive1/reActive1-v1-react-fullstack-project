import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
    fullName: String, 
    email: String,
    phone: String,
    message: String

});

export default mongoose.model('contacts', contactSchema);

