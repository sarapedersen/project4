export interface Country {
    id: string
    name: string,
    flags_svg: string,
    flags_png: string,
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

export const defaultCountry: Country = {
    id: "",
    name: "",
    flags_svg: "",
    flags_png: "",
    capital: "",
    population: 0,
    region: "",
    area: 0
  }

export const maxElementsOnPage: number = 9