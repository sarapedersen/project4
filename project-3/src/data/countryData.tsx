import { type } from "@testing-library/user-event/dist/type";
import { atom, selector } from "recoil";
import { Country } from '../types';


async function fetchCountries() {
    let defCountries: Country[] = []
    console.log("howrhgowrgfo")
    await fetch('http://localhost:3020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{"query":"{countries{name, capital, region, population, area, flags_svg, flags_png, independent}}"}'
    })
        .then((response) => response.json())
        .then((data) => defCountries = data.data.countries)
    console.log(defCountries)
    return defCountries
  }

  
  export const countriesState = atom({
    key: "countriesState",
    default: fetchCountries()
  });
  