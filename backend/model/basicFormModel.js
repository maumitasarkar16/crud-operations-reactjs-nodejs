import mongoose from 'mongoose';

const BasicFormSchema = new mongoose.Schema({
    name: { type: String, required: true},
    age: { type: Number, required: true},
    email: { type: String, required: true, unique: true, maxlength: 200},
    password: { type: String, required: true, minlength: 5, maxlength: 200},
    image: { type: String },
    public_id: { type: String }
    
})

const BasicForm = mongoose.model('BasicFormModel',BasicFormSchema);

export default BasicForm 