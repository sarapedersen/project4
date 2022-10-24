// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv"; 



// Global Variables
export const collections: { countries?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config(); 
    if (process.env.DB_CONN_STRING != undefined && process.env.COUNTRY_COLLECTION_NAME != undefined) {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING); 
        await client.connect(); 
        const db: mongoDB.Db = client.db(process.env.DB_NAME); 
        const countriesCollection: mongoDB.Collection = db.collection(process.env.COUNTRY_COLLECTION_NAME); 
        
        collections.countries = countriesCollection; 

        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${countriesCollection.collectionName}`);
    } else {
        console.log(`Did not connect to database`);


    }

}