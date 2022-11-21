import { Country, defaultCountry, defaultUser, User, maxElementsOnPage } from "../types"

//QUERY TO FETCH DATA


const link = "localhost:4000"; 

// query which gets the correct countries from "all countries" based on the inputs (search string, sorting and pagenumber (pagination)) 
export async function searchCountries(searchInput: string, sortInput: string, from: number) {
    let defCountries: Country[] = []
    console.log("SearchCountries Connect To Backend")
    let noe = `query {countriesByName(searchInput: "${searchInput}", sorting: "${sortInput}", from: ${from}, numItems: ${maxElementsOnPage}){id, name, capital, region, population, area, flags_svg, flags_png, independent}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.countriesByName)
    return defCountries
  }

  // gets only the number of countries that match the search input from "all countries"
  export async function numOfSearchCountries(searchInput: string) {
    let numberOfCountries = 0
    console.log("numOfSearchCountries Connect To Backend")
    let noe = `query {numCountriesByName(searchInput: "${searchInput}")}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => numberOfCountries = data.data.numCountriesByName)
    return numberOfCountries
  }

  // gets the total number of countries in the database
  export async function numCountries() {
    let numberOfCountries: number = 0
    console.log("numCountries Connect To Backend")
    let noe = `query {numCountries}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => numberOfCountries = data.data.numCountries)
    return numberOfCountries
  }

  // gets only the number of countries that match the search input from "my countries"
  export async function numOfMyCountriesBySearch(searchInput: string, list: string[]) {
    let numberOfCountries = 0
    console.log("numOfMyCountriesBySearch Connect To Backend")
    let noe = `query {numCountriesFromListByName(searchInput: "${searchInput}", list:${JSON.stringify(list)})}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => numberOfCountries = data.data.numCountriesFromListByName)
    return numberOfCountries
  }


  // gets the information that match the countries in "my countries" based on the inputs (search string, sorting and pagenumber (pagination))
  export async function myCountries(searchInput: string, list: string[], from: number, sorting: string) {
    let defCountries: Country[] = []
    console.log("myCountries Connect To Backend")
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

 
// finds all the information about a country where the id match
export async function findCountryById(id: string) {
    let defCountries: Country = defaultCountry
    console.log("findCountryById Connect To Backend")
    let noe = `query {country(id: "${id}"){id, name, capital, region, population, area, flags_svg, flags_png, independent}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.country)
    return defCountries
}


// Fetch user based on correct username and password
export async function findUser(username: string, password: string) { 
    let user: User = defaultUser; 
    console.log("findUser Connect To Backend")
    let noe = `query{userLogIn(username: "${username}", password: "${password}") {id, username, password, beenTo}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.userLogIn)
    return user
}


  // Update beenTo on the user with the corresponding Id
  export async function updateUser(id: string, beenTo: string[]) {
    let user: User = defaultUser; 
    console.log("updateUser Connect To Backend")
    let testBeenTo: string = ""
    beenTo.forEach((element) => testBeenTo =`${testBeenTo}, "${element}"`)
    let noe = `mutation{updateUser(id: "${id}", beenTo:[${testBeenTo}]){id, username, password, beenTo}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.updateUser)
    return user
  }


  // Make new user
  export async function addUser(username: string, password: string, beenTo: string[]) {
    let user: User = defaultUser; 
    console.log("addUser Connect To Backend")
    let noe = `mutation{addUser(username:"${username}", password:"${password}" beenTo: [${beenTo}]){username, beenTo, password}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => user = data.data.addUser)
    return user
  }
  
  // Fetch all usernames
  export async function checkUsername(username: string) {
    let check = false; 
    console.log("getAllUsername Connect To Backend")
    let noe = `query{usernameExist(username: "${username}")}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => check = data.data.usernameExist)
    console.log("usernameExist: ", check)
    return check
  }
