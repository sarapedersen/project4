import { atom, selector } from "recoil";
import { Country } from '../types';


async function fetchCountries() {
    let defCountries: Country[] = []
    console.log("howrhgowrgfo")
    await fetch('http://localhost:4000/countries')
        .then((response) => response.json())
        .then((data) => defCountries = data)
    return defCountries
  }

  
  export const countriesState = atom({
    key: "countriesState",
    default: fetchCountries()
  });
  
