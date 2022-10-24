// External dependencies 
import { ObjectId } from "mongodb"; 


// Class implementation


    export default interface Country {
        name: string,
        flag: string,
        capital: string,
        population: number,
        continent: string, 
        area: number, 
        languages: string[], 
        ObjectId?: ObjectId
    }
