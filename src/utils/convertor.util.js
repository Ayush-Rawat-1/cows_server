import mongoose from "mongoose";
import fs from "fs";
import csvParser from "csv-parser";
import Breed from "../models/Breed.model.js";
import Disease from "../models/disease.model.js";
import Location from "../models/location.model.js";

// Function to read CSV and store data in MongoDB
const cattleBreedToDb = async (csvFilePath) => {
    try {
        const results = [];

        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                const breedData = {
                    name: row.Name,
                    characteristics: row.Characteristics || null,
                    location: row['Breeding Tract'],
                    yield: row['Yield Per Lactation'],
                    image: row['Image'] || null
                };
                
                results.push(breedData);
            })
            .on('end', async () => {
                // Insert all records into MongoDB at once
                if (results.length > 0) {
                    await Breed.insertMany(results);
                    console.log(`${results.length} records have been successfully inserted into MongoDB.`);
                } else {
                    console.log('No data to insert.');
                }

            })
            .on('error', (err) => {
                console.error('Error reading the CSV file:', err);
            });
    } catch (error) {
        console.error('Error during MongoDB operation:', error);
    }
};

const diseaseToDb = async (csvFilePath) => {
    try {
        // Open a connection to MongoDB (if not already connected)
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect('mongodb://localhost:27017/your-database-name', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }

        const results = [];

        // Read the CSV file
        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                // Map the CSV data to the disease schema fields
                const diseaseData = {
                    name: row.Diseases,
                    symptoms: row.Symptoms || null,
                    treatments: row.Treatments || null
                };
                
                results.push(diseaseData);
            })
            .on('end', async () => {
                // Insert all records into MongoDB at once
                if (results.length > 0) {
                    await Disease.insertMany(results);
                    console.log(`${results.length} disease records have been successfully inserted into MongoDB.`);
                } else {
                    console.log('No data to insert.');
                }

            })
            .on('error', (err) => {
                console.error('Error reading the CSV file:', err);
            });
    } catch (error) {
        console.error('Error during MongoDB operation:', error);
    }
};

const processCSVAndStoreData = (csvFilePath) => {
    const locations = [];
  
    // Read and parse the CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        // Process each row and store the location and diseases
        const locationName = row.Location;
        const diseases = row.Diseases.split(", ").map(disease => disease.trim());
  
        locations.push({
          location: locationName,
          diseases: diseases
        });
      })
      .on("end", async () => {
        console.log("CSV file successfully processed");
  
        // Save the locations to the MongoDB database
        for (const loc of locations) {
          try {
            const location = new Location({
              location: loc.location,
              diseases: loc.diseases
            });
  
            await location.save();
            // console.log(`Saved: ${loc.location}`);
          } catch (error) {
            console.error("Error saving location:", error);
          }
        }
        console.log("All locations saved successfully.");
      });
  };

export {cattleBreedToDb,diseaseToDb,processCSVAndStoreData};