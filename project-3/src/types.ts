export interface Country {
    id: string
    name: string,
    flagSvg: string,
    flagPng: string,
    capital: string,
    population: number,
    region: string, 
    area: number
    hasBeen: Boolean
}

export interface countrySearchType {
    country: string
}