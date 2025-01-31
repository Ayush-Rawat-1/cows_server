import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        symptoms: {
            type: String,
        },
        treatments: {
            type: String,
        }
    },
    {
        timestamps: true
    });

const Disease = mongoose.model('Diseases', diseaseSchema);

export default Disease;