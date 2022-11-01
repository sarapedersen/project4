import { GraphQLSchema } from "graphql"
import { Schema, model } from 'mongoose'; 
import { Country, User } from './types';
import { Mutation, RootQuery } from "./queries";

export const countrySchema = new Schema({
    name: { type: String, required: true}, 
    capital: { type: String, required: true}, 
    region: { type: String, required: true},
    population: { type: String, required: true},
    area: { type: String, required: true},
    flags_svg: { type: String, required: true},
    flags_png: { type: String, required: true},
    independent: { type: String, required: true}
})

export const userSchema = new Schema({
    username: { type: String, required: true}, 
    password: { type: String, required: true}, 
    beenTo: {type: [String], required: true }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

export const sCountry = model<Country>('Country', countrySchema)

export const sUser = model<User>('User', userSchema)