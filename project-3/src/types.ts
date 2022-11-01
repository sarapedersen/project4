export interface Country {
    id: string,
    name: string,
    flagSvg: string,
    flagPng: string,
    capital: string,
    population: number,
    region: string, 
    area: number, 
}

export interface User {
    id: string, 
    username: string, 
    password: string, 
    beenTo: string[]
}

export interface countrySearchType {
    country: string
}

export const defaultUser: User = {
    id: "",
    username: "",
    password: "",
    beenTo: []
  }