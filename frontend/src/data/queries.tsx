import { Country, defaultCountry, defaultUser, User, maxElementsOnPage } from "../types"

//QUERY TO FETCH DATA

// Fetch countries based on search and sort variables

const link = "localhost:4000"; 

export async function searchCountries(searchInput: string, sortInput: string, from: number) {
    let defCountries: Country[] = []
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


  export async function numOfSearchCountries(searchInput: string) {
    let numberOfCountries = 0
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

  export async function numCountries() {
    let numberOfCountries: number = 0
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

  export async function specificCountries(from: number, sorting: string) {
    let defCountries: Country[] = []
    let graphqlQuery = `query {specificCountries(from: ${from}, numItems: ${maxElementsOnPage}, sorting: "${sorting}"){id, name, capital, region, population, area, flags_svg, flags_png, independent}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: graphqlQuery})
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.specificCountries)
    return defCountries
  }

 

export async function findCountryById(id: string) {
    let defCountries: Country = defaultCountry
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
    let noe = `query{userLogIn(username: "${username}", password: "${password}") {id, username, password, beenTo}}
    `
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

  export async function getAllUsername() {
    let list: string[] = []; 
    let noe = `query{users{username}}`
    await fetch(`http://${link}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => list = data.data.users)
    return list
  }
