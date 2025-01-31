import mongoose from "mongoose";

const breedSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        characteristics: {
            type: String,
            nullable: true
        },
        location: {
            type: String,
        },
        yield: {
            type: String,
        },
        image: {
            type: String,
            nullable: true
        }
    },
    {
        timestamps: true
    }
);

const Breed = mongoose.model('Breeds', breedSchema);

export default Breed;
