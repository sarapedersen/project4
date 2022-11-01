"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = exports.RootQuery = void 0;
const graphql_1 = require("graphql");
const types_1 = require("./types");
const schema_1 = require("./schema");
exports.RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: types_1.UserType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return schema_1.sUser.findById(args.id);
            }
        },
        userLogIn: {
            type: types_1.UserType,
            args: { username: { type: graphql_1.GraphQLString }, password: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                const loginFilter = { username: { $regex: new RegExp(args.user, 'i') } };
                return schema_1.sUser.findOne({ username: args.username, password: args.password });
            }
        },
        users: {
            type: new graphql_1.GraphQLList(types_1.UserType),
            resolve(parent, args) {
                return schema_1.sUser.find({});
            }
        },
        country: {
            type: types_1.CountryType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return schema_1.sCountry.findById(args.id);
            }
        },
        countries: {
            type: new graphql_1.GraphQLList(types_1.CountryType),
            resolve(parent, args) {
                return schema_1.sCountry.find({});
            }
        },
        countriesByName: {
            type: new graphql_1.GraphQLList(types_1.CountryType),
            args: { searchInput: { type: graphql_1.GraphQLString }, sorting: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                const countryFilter = { name: { $regex: new RegExp(args.searchInput, 'i') } };
                return schema_1.sCountry.find(countryFilter).sort({ name: args.sorting });
            }
        },
    }
});
exports.Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: types_1.UserType,
            args: {
                username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                beenTo: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                let user = new schema_1.sUser({
                    username: args.username,
                    password: args.password,
                    beenTo: args.beenTo
                });
                return user.save();
            }
        },
        updateUser: {
            type: types_1.UserType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                // username: {type: new GraphQLNonNull(GraphQLString)},
                // password: {type: new GraphQLNonNull(GraphQLString)},
                beenTo: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                // let user = new sUser({
                //     id: args.id,
                //     username: args.username,
                //     password: args.password,
                //     beenTo: args.beenTo
                // })
                return schema_1.sUser.findOneAndUpdate({ "_id": args.id }, { "$set": { beenTo: args.beenTo } }, { "new": true });
            }
        }
    }
});
