"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing module
const express_1 = __importDefault(require("express"));
const graphql_1 = require("graphql");
const express_graphql_1 = require("express-graphql");
const mongoose_1 = require("mongoose");
const dotenv = __importStar(require("dotenv"));
const app = (0, express_1.default)();
const cors = require('cors');
const PORT = 3010;
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    beenTo: { type: String, required: true }
});
const sUser = (0, mongoose_1.model)('User', userSchema);
const countrySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    capital: { type: String, required: true },
    region: { type: String, required: true },
    population: { type: String, required: true },
    area: { type: String, required: true },
    flags_svg: { type: String, required: true },
    flags_png: { type: String, required: true },
    independent: { type: String, required: true }
});
const sCountry = (0, mongoose_1.model)('Country', countrySchema);
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        beenTo: { type: graphql_1.GraphQLString }
    })
});
const CountryType = new graphql_1.GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        capital: { type: graphql_1.GraphQLString },
        region: { type: graphql_1.GraphQLString },
        population: { type: graphql_1.GraphQLString },
        area: { type: graphql_1.GraphQLString },
        flags_svg: { type: graphql_1.GraphQLString },
        flags_png: { type: graphql_1.GraphQLString },
        independent: { type: graphql_1.GraphQLString }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return sUser.findById(args.id);
            }
        },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve(parent, args) {
                return sUser.find({});
            }
        },
        country: {
            type: CountryType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return sCountry.findById(args.id);
            }
        },
        countries: {
            type: new graphql_1.GraphQLList(CountryType),
            resolve(parent, args) {
                return sCountry.find({});
            }
        }
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                beenTo: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                let user = new sUser({
                    id: args.id,
                    username: args.username,
                    password: args.password,
                    beenTo: args.beenTo
                });
                return user.save();
            }
        }
    }
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONN_STRING);
mongoose.connection.once('open', () => {
    console.log('connected to database');
});
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema,
    graphiql: true,
}));
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
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
