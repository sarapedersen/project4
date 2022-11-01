import { type } from "@testing-library/user-event/dist/type";
import { atom, selector } from "recoil";
import { Country, defaultUser, User } from '../types';



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
    console.log("fromdb get: ", defCountries)
    return defCountries
  }


  // Fetch user based on correct username and password

  export async function findUser(username: string, password: string) { // Mangler ID som trengs
    let user: User = defaultUser; 
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
        .then((data) => user = data.data.userLogIn)
    console.log("user from fetch", user)
    return user
  }


  // Update beenTo on the user with the corresponding Id

  export async function updateUser(id: string, beenTo: string[]) {
    let user: User = defaultUser; 
    let noe = `mutation{updateUser(id: "${id}", beenTo:${beenTo}){beenTo}}`
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.updateUser)
    console.log("user from fetch", user)
    return user
  }


  // Make new user
  
  export async function addUser(username: string, password: string, beenTo: string[]) {
    let user: User = defaultUser; 
    let noe = `mutation{addUser(username:"${username}", password:"${password}" beenTo: ${beenTo}){username, beenTo, password}}`
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.addUser)
    console.log("user from fetch", user)
    return user
  }
  
  // Fetch all usernames

  export async function getAllUsername() {
    let user: User = defaultUser; 
    let noe = `query{users{username}}`
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.users)
    console.log("user from fetch", user)
    return user
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


  // RECOIL - USERS (username)

  export const allUsernames = atom ({
    key: "allUsernames", 
    default: getAllUsername()
  })

  // RECOIL - USERS (Login)

  export const userState = atom ({
    key: "userState",
    default: defaultUser 
  })

  export const userLogin = selector({
    key: "userLogin",
    get: async ({get}) => {
      const loginCredentials: User = get(userState)
      const user = await findUser(loginCredentials.username, loginCredentials.password)
      return user
    }
  });

// RECOIL - USERS (beenTo)

  export const updateBeenTo = selector({ // NOT TESTED KOMPIS
    key: "updateBeenTo",
    get: async ({get}) => {
      const currentUser: User = get(userState)
      const answere = await updateUser(currentUser.id, currentUser.beenTo)
      if (answere === null) {
        return false
      }
      return true
    }
  });
