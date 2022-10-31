import { type } from "@testing-library/user-event/dist/type";
import { atom, selector } from "recoil";
import { Country } from '../types';


async function fetchAllCountries() {
    let defCountries: Country[] = []
    console.log("howrhgowrgfo")
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `{"query":"{countries{name, capital, region, population, area, flags_svg, flags_png, independent}}"}`
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.countries)
    console.log(defCountries)
    return defCountries
  }
  
  export const countriesState = atom({
    key: "countriesState",
    default: fetchAllCountries()
  });


  export async function searchCountries(searchInput: string) {
    let defCountries: Country[] = []
    let noe = `query {countriesByName(searchInput: "${searchInput}") {id, name, capital, region, population, area, flags_svg, flags_png, independent}}`

    console.log("howrhgowrgfo")
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: noe})
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.countriesByName)
    console.log(defCountries)
    return defCountries
  }

  export const searchState = atom({
    key: "searchState",
    default: ""
  });
  
  export const searchCountryState = selector({
    key: "searchCountryState",
    get: async ({get}) => {
      const filter = get(searchState)
      const list = get(countriesState)
      if (filter !== "") {
        return await searchCountries(filter)
      } 
      return await list
    }
  });
