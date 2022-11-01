"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.CountryType = void 0;
const graphql_1 = require("graphql");
exports.CountryType = new graphql_1.GraphQLObjectType({
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
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        beenTo: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
        }
    })
});
