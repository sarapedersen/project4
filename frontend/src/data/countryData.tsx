import { atom, selector } from "recoil";
import { User, maxElementsOnPage } from '../types';
import { searchCountries, numOfSearchCountries, numOfMyCountriesBySearch, myCountries} from "./queries";
import { currentUser } from "./userData";



// RECOIL - COUNTRIES

  // handles the search field
  export const searchState = atom({
    key: "searchState",
    default: ""
  });

  // handles which page the user views
  export const currentPageState = atom({
    key: "currentPageState", 
    default: 1
  })

  // handles which sorting the user has picked
  export const sortState = atom({
    key: "sortState",
    default: "asc"
  });

  // handles which list of countries the user sees (filtering), either all countries or the countries they have visited (my countries)
  export const myCountriesState = atom({
    key: "myCountriesState", 
    default: false
  })

  // gets the max number of countries that can be shown which is limited by both the filter and the search field from the backend
  // returns the calculated max pages the pagination can show based in the number of countries. 
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
  
  // gets the list of "all countries" that fulfills the requirements the user sets (by search and sorting)
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

  // gets the list of "my countries" that fulfills the requirements the user sets (by search and sorting)
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




