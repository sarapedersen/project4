// External dependencies 
import { ObjectId } from "mongodb"; 


// Class implementation


    export interface Country {
        name: string,
        flag: string,
        capital: string,
        population: number,
        continent: string, 
        area: number, 
        ObjectId?: ObjectId
    }

    export interface User {
        username: string, 
        password: string, 
        beenTo: string[],
        ObjectId?: ObjectId
    }
