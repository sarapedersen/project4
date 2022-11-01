// Importing module
import Express from 'express'
import { GraphQLObjectType, GraphQLString, GraphQLNonNull ,GraphQLID, GraphQLList, GraphQLSchema, buildSchema, GraphQLInt } from "graphql"
import { graphqlHTTP } from "express-graphql"
import { Schema, model, connect} from 'mongoose'; 
import * as dotenv from "dotenv"; 
import { connectToDatabase } from './src/services/database.service';
import { countriesRouter, usersRouter } from './src/routes/countries.router';
import { type } from 'os';
import { CountQueuingStrategy } from 'node:stream/web';
import { toNamespacedPath } from 'path';


const app = Express(); 
const cors = require('cors');
const PORT:Number = 3020;



// THE GRAPHQL SCHEMA
interface Country {
    id: string; 
    name: string;
    capital: string; 
    region: string; 
    population: string;
    area: string;
    flags_svg: string; 
    flags_png: string; 
    independent: string; 
}
const countrySchema = new Schema({
    string: {type: String, required: true},
    name: { type: String, required: true}, 
    capital: { type: String, required: true}, 
    region: { type: String, required: true},
    population: { type: String, required: true},
    area: { type: String, required: true},
    flags_svg: { type: String, required: true},
    flags_png: { type: String, required: true},
    independent: { type: String, required: true}
})

const CountryType = new GraphQLObjectType({
    name: 'Country', 
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        capital: {type: GraphQLString},
        region: {type: GraphQLString},
        population: {type: GraphQLString},
        area: {type: GraphQLString},
        flags_svg: {type: GraphQLString},
        flags_png: {type: GraphQLString},
        independent: {type: GraphQLString}
    })

})

const sCountry = model<Country>('Country', countrySchema)

interface User {
    username: string;
    password: string; 
    beenTo: [string]; 
}

const userSchema = new Schema({
    username: { type: String, required: true}, 
    password: { type: String, required: true}, 
    beenTo: {type: [String] }
})

const sUser = model<User>('User', userSchema)

const UserType = new GraphQLObjectType({
    name: 'User', 
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        beenTo: {
            type: new GraphQLList(CountryType),
            resolve(parent, args) {
                return sCountry.findById(parent.id);
            }
        }
    })

})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return sUser.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return sUser.find({});
            }
        },
        country: {
            type: CountryType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return sCountry.findById(args.id);
            }
        },
        countries: {
            type: new GraphQLList(CountryType),
            resolve(parent, args) {
                return sCountry.find({});
            }
        },
        countriesByName: {
            type: new GraphQLList(CountryType),
            args: {searchInput: {type: GraphQLString}, sorting: {type: GraphQLString}},
            resolve(parent, args) {
                const countryFilter = { name: { $regex: new RegExp(args.searchInput, 'i')}}
                return sCountry.find(countryFilter).sort({name: args.sorting});
            }
        },
        sortCountries: {
            type: new GraphQLList(CountryType),
            args: {sorting: {type: GraphQLString}},
            resolve(parent, args) {
                return sCountry.find({}).sort({name: args.sorting});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser:{
            type: UserType, 
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)},
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
                beenTo: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))}
            },
            resolve(parent, args){
                let user = new sUser({
                    id: args.id,
                    username: args.username,
                    password: args.password,
                    beenTo: args.beenTo
                })
                return user.save()
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})




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



// TYPESCRIPT TYPES FOR STATIC TYPING 

// type User = {
//     id: number
//     username: string
//     password: string
//     beenTo: string
// }

// type UserInput = Pick<User, "username" | "password" | "beenTo" >


// // RESOLVERS

// const getUser = (args: { id: number }): User | undefined =>
//     users.find(u => u.id === args.id)

// const getUsers = (): User[] => users

// const createUser = (args: { input: UserInput }): User => {
//     const user = {
//         id: users.length + 1,
//         ...args.input,
//     }
//     users.push(user)

//     return user
// }

// const updateUser = (args: { user: User }): User => {
//     const index = users.findIndex(u => u.id === args.user.id)
//     const targetUser = users[index]

//     if (targetUser) users[index] = args.user

//     return targetUser
// }

// const root = {
//     getUser,
//     getUsers,
//     createUser,
//     updateUser,
// }




// Handling GET / request
// connectToDatabase()
//     .then(() => {
//         app.use(
//             "/graphql",
//             graphqlHTTP({
//                 schema: schema,
//                 rootValue: root,
//                 graphiql: true,
//             })
//         )
//         app.use(cors())
//         app.use("/countries", countriesRouter); 
//         app.use("/users", usersRouter)

//         app.listen(PORT, () => {
//             console.log(`Server started at http://localhost:${PORT}`);
//         })
//     })
//     .catch((error: Error) => {
//         console.error("Database connection failed", error); 
//         process.exit(); 
//     })


// app.get('/', (req, res) => {
//     res.send('Welcome to typescript backend!');
// })

// // Server setup
// app.listen(PORT, () => {
//     console.log('The application is listening ' + 'on port http://localhost:' +PORT);
// })

