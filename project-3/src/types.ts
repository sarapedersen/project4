export interface Country {
    name: string,
    flagSvg: string,
    flagPng: string,
    capital: string,
    population: number,
    region: string, 
    area: number, 
    languages: string[]
}

export interface countrySearchType {
    country: string
}