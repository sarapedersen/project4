// Importing module
import Express from 'express'
import { connectToDatabase } from './src/services/database.service';
import { countriesRouter } from './src/routes/countries.router';

const app = Express(); 
const PORT:Number = 4000;

// Handling GET / request
connectToDatabase()
    .then(() => {
        app.use("/countries", countriesRouter); 

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        })
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error); 
        process.exit(); 
    })


// app.get('/', (req, res) => {
//     res.send('Welcome to typescript backend!');
// })

// // Server setup
// app.listen(PORT, () => {
//     console.log('The application is listening ' + 'on port http://localhost:' +PORT);
// })

