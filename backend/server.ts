// Importing module
import Express from 'express'
import { graphqlHTTP } from "express-graphql"
import * as dotenv from "dotenv"; 
import { schema } from './src/schema';

const app = Express(); 
const cors = require('cors');
const PORT:Number = 4000;


dotenv.config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONN_STRING);

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use(cors())
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
)

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})

