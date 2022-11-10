import { atom, selector, useSetRecoilState } from "recoil";
import { Country, User, maxElementsOnPage } from '../types';
import { searchCountries, findCountryById, numCountries, numOfSearchCountries} from "./queries";
import { currentUser } from "./userData";



// RECOIL - COUNTRIES

  export const searchState = atom({
    key: "searchState",
    default: ""
  });

  export const currentPageState = atom({
    key: "currentPageState", 
    default: 1
  })

  export const sortState = atom({
    key: "sortState",
    default: "asc"
  });

  export const numOfCountriesState = selector({
    key: "maxPageState", 
    get: async ({get}) => {
      const filter = get(searchState)
      return await numOfSearchCountries(filter)
    }
  })
  
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


