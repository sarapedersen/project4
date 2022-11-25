import { Country, defaultCountry, defaultUser, User, maxElementsOnPage } from "../types"

/* QUERY TO FETCH DATA */


const link = "it2810-08.idi.ntnu.no:4000"; 

// Query which gets the correct countries from "all countries" based on the inputs (search string, sorting and pagenumber (pagination)) 
export async function searchCountries(searchInput: string, sortInput: string, from: number) {
    let defCountries: Country[] = []
    let graphqlQuery = `query {countriesByName(searchInput: "${searchInput}", sorting: "${sortInput}", from: ${from}, numItems: ${maxElementsOnPage}){id, name, capital, region, population, area, flags_svg, flags_png, independent}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.countriesByName)
    return defCountries
  }

  // Gets only the number of countries that match the search input from "all countries"
  export async function numOfSearchCountries(searchInput: string) {
    let numberOfCountries = 0
    let graphqlQuery = `query {numCountriesByName(searchInput: "${searchInput}")}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => numberOfCountries = data.data.numCountriesByName)
    return numberOfCountries
  }

  // Gets the total number of countries in the database
  export async function numCountries() {
    let numberOfCountries: number = 0
    let graphqlQuery = `query {numCountries}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => numberOfCountries = data.data.numCountries)
    return numberOfCountries
  }

  // Gets only the number of countries that match the search input from "my countries"
  export async function numOfMyCountriesBySearch(searchInput: string, list: string[]) {
    let numberOfCountries = 0
    let graphqlQuery = `query {numCountriesFromListByName(searchInput: "${searchInput}", list:${JSON.stringify(list)})}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => numberOfCountries = data.data.numCountriesFromListByName)
    return numberOfCountries
  }


  // Gets the information that match the countries in "my countries" based on the inputs (search string, sorting and pagenumber (pagination))
  export async function myCountries(searchInput: string, list: string[], from: number, sorting: string) {
    let defCountries: Country[] = []
    let graphqlQuery = `query {countriesFromList(searchInput: "${searchInput}", list: ${JSON.stringify(list)}, sorting: "${sorting}", from: ${from}, numItems: ${maxElementsOnPage}){id, name, capital, region, population, area, flags_svg, flags_png, independent}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.countriesFromList)
    return defCountries
  }

 
// Finds all the information about a country where the id match
export async function findCountryById(id: string) {
    let defCountries: Country = defaultCountry
    let graphqlQuery = `query {country(id: "${id}"){id, name, capital, region, population, area, flags_svg, flags_png, independent}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.country)
    return defCountries
}


// Fetch user based on correct username and password
export async function findUser(username: string, password: string) { 
    let user: User = defaultUser; 
    let graphqlQuery = `query{userLogIn(username: "${username}", password: "${password}") {id, username, password, beenTo}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.userLogIn)
    return user
}


  // Update beenTo on the user with the corresponding Id
  export async function updateUser(id: string, beenTo: string[]) {
    let user: User = defaultUser; 
    let tempBeenTo: string = ""
    beenTo.forEach((element) => tempBeenTo =`${tempBeenTo}, "${element}"`)
    let graphqlQuery = `mutation{updateUser(id: "${id}", beenTo:[${tempBeenTo}]){id, username, password, beenTo}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.updateUser)
    return user
  }


  // Make new user
  export async function addUser(username: string, password: string, beenTo: string[]) {
    let user: User = defaultUser; 
    let graphqlQuery = `mutation{addUser(username:"${username}", password:"${password}" beenTo: [${beenTo}]){username, beenTo, password}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.addUser)
    return user
  }
  
  // Fetch all usernames
  export async function checkUsername(username: string) {
    let check = false; 
    let graphqlQuery = `query{usernameExist(username: "${username}")}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => check = data.data.usernameExist)
    return check
  }
