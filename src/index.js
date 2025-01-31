import express from 'express';
import mongoconnect from './config/db.config.js';
import cattleRoute from './routes/cattle.routes.js';
import cors from "cors"

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors())

const PORT = process.env.PORT || 3000;

await mongoconnect();

app.use("/cattle",cattleRoute);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});