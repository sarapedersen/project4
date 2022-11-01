import { GraphQLObjectType, GraphQLString, GraphQLNonNull ,GraphQLID, GraphQLList} from "graphql" 
import { UserType, CountryType } from './types';
import { sUser, sCountry } from "./schema";

export const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return sUser.findById(args.id);
            }
        },
        userLogIn: {
            type: UserType,
            args: {username: {type: GraphQLString}, password: {type: GraphQLString}},
            resolve(parent, args) {
                const loginFilter = { username: { $regex: new RegExp(args.user, 'i')}}
                return sUser.findOne({username: args.username, password: args.password});
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
        
    }
})

export const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser:{
            type: UserType, 
            args:{
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
                beenTo: {type: new GraphQLList(GraphQLString)}
            },
            resolve(parent, args){
                let user = new sUser({
                    username: args.username,
                    password: args.password,
                    beenTo: args.beenTo
                })
                return user.save()
            }
        }, 
        updateUser: {
            type: UserType, 
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                // username: {type: new GraphQLNonNull(GraphQLString)},
                // password: {type: new GraphQLNonNull(GraphQLString)},
                beenTo: {type: new GraphQLList(GraphQLString)}
            }, 
            resolve(parent, args){
                // let user = new sUser({
                //     id: args.id,
                //     username: args.username,
                //     password: args.password,
                //     beenTo: args.beenTo
                // })
                return sUser.findOneAndUpdate({"_id": args.id}, {"$set": {beenTo: args.beenTo}}, {"new": true})
            }
        }
    }
})