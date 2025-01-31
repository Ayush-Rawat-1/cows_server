import Breed from "../models/Breed.model.js";
import Disease from "../models/disease.model.js";
import Location from "../models/location.model.js";

const getBreeds = async (req,res) => {
    try {
        const breeds = await Breed.find().select('-_id -createdAt -updatedAt -__v');
        res.status(200).json({breeds});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getLocations = async (req,res) => {
    try{
        const locations = await Location.find().select('-_id -createdAt -updatedAt -__v');
        res.status(200).json({locations})
    }catch (err){
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getDiseases = async (req,res) => {
    try{
        const diseases = await Disease.find().select('-_id -createdAt -updatedAt -__v');
        res.status(200).json({diseases})
    }catch (err){
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

export {getBreeds,getLocations,getDiseases}