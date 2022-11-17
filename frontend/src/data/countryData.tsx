import { atom, selector, useSetRecoilState } from "recoil";
import { Country, User, maxElementsOnPage } from '../types';
import { searchCountries, findCountryById, numCountries, numOfSearchCountries, numOfMyCountriesBySearch, myCountries} from "./queries";
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

  export const myCountriesState = atom({
    key: "myCountriesState", 
    default: false
  })

  export const maxPageState = selector({
    key: "maxPageState", 
    get: async ({get}) => {
      const filter = get(searchState)
      let numCountries = 0
      const myCountries = get(myCountriesState)
      const user = get(currentUser)
      if (myCountries) {
        if (user === undefined) return 0
        numCountries = await numOfMyCountriesBySearch(filter, user.beenTo)
      } else {
        numCountries = await numOfSearchCountries(filter)
      }
      if (typeof numCountries === typeof 1) {
        return Math.ceil(numCountries/maxElementsOnPage)
      }
      return 0      
    }
  })
  
  export const searchCountryState = selector({
    key: "searchCountryState",
    get: async ({get}) => {
      const filter = get(searchState)
      const maxPage = get(maxPageState)
      const sort = get(sortState)
      const currentPage = get(currentPageState)
      const countryState = get(myCountriesState)
      if (!countryState) {
        if (currentPage > maxPage) {
          return await searchCountries(filter, sort, maxPage*maxElementsOnPage)
        } 
        return await searchCountries(filter, sort, (currentPage-1)*maxElementsOnPage)
      }
      return []
    }
  });

  export const countriesBeenTo = selector({
    key: "countriesBeenTo",
    get: async ({get}) => {
      const filter = get(searchState)
      const user: User | undefined = get(currentUser)
      const maxPage = get(maxPageState)
      const sort = get(sortState)
      const currentPage = get(currentPageState)
      const countryState = get(myCountriesState)
      if (user === undefined) return []
      if (user.beenTo.length !== 0 && countryState) {
        if (currentPage > maxPage) {
          return await myCountries(filter, user.beenTo, maxPage*maxElementsOnPage, sort)
        } 
        return await myCountries(filter, user.beenTo, (currentPage-1)*maxElementsOnPage, sort)
      }
      return []
    }
  })




