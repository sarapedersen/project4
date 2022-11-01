"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sUser = exports.sCountry = exports.schema = exports.userSchema = exports.countrySchema = void 0;
const graphql_1 = require("graphql");
const mongoose_1 = require("mongoose");
const queries_1 = require("./queries");
exports.countrySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    capital: { type: String, required: true },
    region: { type: String, required: true },
    population: { type: String, required: true },
    area: { type: String, required: true },
    flags_svg: { type: String, required: true },
    flags_png: { type: String, required: true },
    independent: { type: String, required: true }
});
exports.userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    beenTo: { type: [String], required: true }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: queries_1.RootQuery,
    mutation: queries_1.Mutation
});
exports.sCountry = (0, mongoose_1.model)('Country', exports.countrySchema);
exports.sUser = (0, mongoose_1.model)('User', exports.userSchema);
