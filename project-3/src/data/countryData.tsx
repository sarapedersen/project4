import { type } from "@testing-library/user-event/dist/type";
import { atom, selector } from "recoil";
import { Country, User } from '../types';



//QUERY TO FETCH DATA

// Fetch countries based on search and sort variables

    export async function searchCountries(searchInput: string, sortInput: string) {
    let defCountries: Country[] = []
    let noe = `query {countriesByName(searchInput: "${searchInput}", sorting: "${sortInput}"){id, name, capital, region, population, area, flags_svg, flags_png, independent}}`
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.countriesByName)
    console.log(defCountries)
    return defCountries
  }

  export async function findUser(username: string, password: string) {
    let defCountries: Country[] = []
    let noe = `query{userLogIn(username: "${username}", password: "${password}") {id, username, password, beenTo}}
    `
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.countriesByName)
    console.log(defCountries)
    return defCountries
  }


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


  // RECOIL - USERS

  const defaultUser: User = {
    id: "",
    username: "",
    password: "",
    beenTo: []
  }

  export const userState = atom ({
    key: "userState",
    default: defaultUser; 
  })

  export const usersBeenTo = selector({
    key: "usersBeenTo",
    get: async ({get}) => {
      const user = get(userState)
      const isCorrect = get(findUser(user.))
      if (isCorrect !== "") {
        return isCorrect
      } 
      return []
    }
  });

