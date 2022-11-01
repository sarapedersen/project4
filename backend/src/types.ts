import { GraphQLObjectType, GraphQLString ,GraphQLID, GraphQLList } from "graphql"

export interface Country {
    name: string;
    capital: string; 
    region: string; 
    population: string;
    area: string;
    flags_svg: string; 
    flags_png: string; 
    independent: string; 
}

export interface User {
    username: string;
    password: string; 
    beenTo: [string]; 
}


export const CountryType = new GraphQLObjectType({
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

export const UserType = new GraphQLObjectType({
    name: 'User', 
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        beenTo: {
            type: new GraphQLList(GraphQLString),
        }
    })  
})