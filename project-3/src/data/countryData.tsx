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
    console.log("findUser", user)
    return user
  }


  // Update beenTo on the user with the corresponding Id

  export async function updateUser(id: string, beenTo: string[]) {
    console.log("Printer beenTo: ", beenTo, "id: ", id)
    let user: User = defaultUser; 
    let testBeenTo: string = ""
    beenTo.forEach((element) => testBeenTo =`${testBeenTo}, "${element}"`)
    console.log("testbeento: ", testBeenTo)
    let noe = `mutation{updateUser(id: "${id}", beenTo:[${testBeenTo}]){id, username, password, beenTo}}`
    console.log("noe stringified: ", JSON.stringify({query: noe}) )
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.updateUser)
    console.log("updateUser", user)
    return user
  }


  // Make new user
  
  export async function addUser(username: string, password: string, beenTo: string[]) {
    let user: User = defaultUser; 
    let noe = `mutation{addUser(username:"${username}", password:"${password}" beenTo: [${beenTo}]){username, beenTo, password}}`
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.addUser)
    console.log("addUser", user)
    return user
  }
  
  // Fetch all usernames

  export async function getAllUsername() {
    let list: string[] = []; 
    let noe = `query{users{username}}`
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => list = data.data.users)
    console.log("getAllUsername", list)
    return list
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

  export const userLoginPage = atom ({
    key: "userLoginPage",
    default: defaultUser 
  })

  export const userRegisterPage = atom ({
    key: "userRegisterPage",
    default: defaultUser 
  })

  export const updateUserState = atom({
    key: "updateUserState", 
    default: defaultUser 
  })

  export const currentUser = selector({
    key: "userLogin",
    get: async ({get}) => {
      const update: User = get(updateUserState)
      if (update.id !== "") {
        const user = await updateUser(update.id, update.beenTo)
        return user
      }
      const loginPage: User = get(userLoginPage)
      const registerPage: User = get(userRegisterPage)
      console.log("loginPage", loginPage)
      if (loginPage.username !== "") {
        const user = await findUser(loginPage.username, loginPage.password)
        return user
      } else if (registerPage.username !== ""){
        const user = await addUser(registerPage.username, registerPage.password, [])
        return user
      }
      return defaultUser
    }
  });

// RECOIL - USERS (beenTo)

  // export const updateBeenTo = selector({ // NOT TESTED KOMPIS
  //   key: "updateBeenTo",
  //   get: async ({get}) => {
  //     const current: User = get(currentUser)
  //     const answere = await updateUser(current.id, current.beenTo)
  //     if (answere === null) {
  //       return false
  //     }
  //     return true
  //   }
  // });
