export interface Country {
    id: string,
    name: string,
    flags_svg: string,
    flags_png: string,
    capital: string,
    population: number,
    region: string, 
    area: number, 
    languages: string[]
}

export interface countrySearchType {
    country: string
}