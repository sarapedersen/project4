// Importing module
import Express from 'express'
import { connectToDatabase } from './src/services/database.service';
import { countriesRouter, usersRouter } from './src/routes/countries.router';

const app = Express(); 
const cors = require('cors');
const PORT:Number = 4000;

// Handling GET / request
connectToDatabase()
    .then(() => {
        app.use(cors())
        app.use("/countries", countriesRouter); 
        app.use("/users", usersRouter)

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

