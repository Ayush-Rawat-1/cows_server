import express from "express";
import { getBreeds, getDiseases, getLocations } from "../controllers/cattles.controllers.js";

const router=express.Router();

router.get("/breeds",getBreeds);

router.get("/locations",getLocations);

router.get("/diseases",getDiseases);

export default router;