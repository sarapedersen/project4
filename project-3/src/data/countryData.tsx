import { atom, selector } from "recoil";
import { Country, User } from '../types';
import { searchCountries, findCountryById} from "./queries";
import { currentUser } from "./userData";



// RECOIL - COUNTRIES

  export const searchState = atom({
    key: "searchState",
    default: ""
  });

  export const sortState = atom({
    key: "sortState",
    default: "asc"
  });
  
  export const searchCountryState = selector({
    key: "searchCountryState",
    get: async ({get}) => {
      const filter = get(searchState)
      const sort = get(sortState)
      if (filter !== "") {
        return await searchCountries(filter, sort)
      } 
      return await searchCountries("", sort)
    }
  });

  export const countriesBeenTo = selector({
    key: "countriesBeenTo",
    get: async ({get}) => {
      const user: User = get(currentUser)
      let countries: Country[] = []
      if (user.beenTo.length !== 0) {
        for (let i = 0; i < user.beenTo.length; i++) {
          let newCountry = await findCountryById(user.beenTo[i])
          countries.push(newCountry)
        }
      }
      return countries
    }
  })


