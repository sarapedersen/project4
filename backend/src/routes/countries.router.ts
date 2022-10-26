// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { Country, User } from "../models/types"

// Gobal Config 
export const countriesRouter = express.Router();
export const usersRouter = express.Router(); 

countriesRouter.use(express.json()); 
usersRouter.use(express.json()); 

// GET Country
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

countriesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id; 

    try {
        const query = { _id: new ObjectId(id) };
        if (collections.countries != undefined) {
            const country = (await collections.countries?.findOne(query)) as unknown as Country; 
            if (country) {
                res.status(200).send(country)
            }
        }
        
        
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
})

// GET User
usersRouter.get("/", async (_req: Request, res: Response) => {
    try {
        if (collections.users != undefined) {
            const users: User[] = (await collections.users.find({}).toArray()) as unknown as User[]; 
            res.status(200).send(users); 
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id; 

    try {
        const query = { _id: new ObjectId(id) };
        if (collections.users != undefined) {
            const user = (await collections.users?.findOne(query)) as unknown as User; 
            if (user) {
                res.status(200).send(user)
            }
        }
        
        
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
})

// POST

// PUT

// DELETE

