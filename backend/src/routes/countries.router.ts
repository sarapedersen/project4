// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Country from "../models/country"

// Gobal Config 
export const countriesRouter = express.Router();

countriesRouter.use(express.json()); 

// GET
countriesRouter.get("/", async (_req: Request, res: Response) => {
    try {
        if (collections.countries != undefined) {
            const countries: Country[] = (await collections.countries.find({}).toArray()) as unknown as Country[]; 
            res.status(200).send(countries); 
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST

// PUT

// DELETE

